import random
import time
import logging
import re
from typing import Dict, List, Optional
from dataclasses import dataclass
import csv
import os

import requests
from bs4 import BeautifulSoup
from requests.exceptions import RequestException

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class CPUBenchmarkScraper:
    BASE_URL = 'https://www.cpubenchmark.net/'

    def __init__(self, output_file='cpu_data.csv'):
        self.output_file = output_file
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        })

        # Define CSV headers
        self.csv_headers = [
            'brand', 'model_name', 'cpu_class', 'socket', 'cores', 'threads',
            'base_clock', 'tdp', 'cache', 'multithread_rating', 'singlethread_rating',
            'first_seen', 'price', 'price_date', 'overall_rank', 'cpumark_price_ratio'
        ]

        # Initialize CSV file with headers
        self._init_csv_file()

    def _init_csv_file(self):
        """Initialize CSV file with headers if it doesn't exist"""
        if not os.path.exists(self.output_file):
            with open(self.output_file, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=self.csv_headers)
                writer.writeheader()

    def _make_request(self, url: str) -> Optional[BeautifulSoup]:
        """Make HTTP request with retry mechanism"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return BeautifulSoup(response.content, 'html.parser')
        except Exception as e:
            logger.error(f"Error fetching {url}: {str(e)}")
            return None

    def get_cpu_list(self) -> List[dict]:
        """Get list of CPUs from main page"""
        url = f"{self.BASE_URL}cpu_list.php"
        soup = self._make_request(url)
        if not soup:
            return []

        cpu_list = []
        cpu_table = soup.find('table', {'id': 'cputable'})
        if not cpu_table:
            return []

        for row in cpu_table.find_all('tr')[1:]:  # Skip header
            cells = row.find_all('td')
            if len(cells) >= 4:
                link = cells[0].find('a')
                if link:
                    cpu_data = {
                        'name': cells[0].text.strip(),
                        'url': link['href']
                    }
                    cpu_list.append(cpu_data)
                    logger.info(f"Found CPU: {cpu_data['name']}")

                    # Optional delay between requests
                    time.sleep(random.uniform(0.5, 1.5))

        return cpu_list

    def get_cpu_detail(self, url: str) -> Optional[dict]:
        """Get detailed CPU information"""
        full_url = f"{self.BASE_URL}{url}" if not url.startswith('http') else url
        soup = self._make_request(full_url)
        if not soup:
            return None

        try:
            desc_div = soup.find('div', class_='desc')
            if not desc_div:
                return None

            cpu_info = {}

            # Get CPU name and brand
            cpu_name = desc_div.select_one('.cpuname')
            if cpu_name:
                full_name = cpu_name.text.strip()
                cpu_info['brand'] = full_name.split()[0]
                cpu_info['model_name'] = full_name

            # Get basic specifications
            for desc in desc_div.select('.left-desc-cpu p'):
                label = desc.find('strong')
                if label:
                    key = label.text.strip(':')
                    value = desc.text.replace(label.text, '').strip()

                    if 'Class' in key:
                        cpu_info['cpu_class'] = value
                    elif 'Cores' in key:
                        cores_threads = value.split('Threads:')
                        cpu_info['cores'] = int(cores_threads[0].strip())
                        if len(cores_threads) > 1:
                            cpu_info['threads'] = int(cores_threads[1].strip())
                    elif 'Clockspeed' in key:
                        cpu_info['base_clock'] = float(value.replace('GHz', '').strip())
                    elif 'Socket' in key:
                        cpu_info['socket'] = value
                    elif 'Typical TDP' in key:
                        cpu_info['tdp'] = int(value.replace('W', '').strip())

            # Get cache information
            cache_info = desc_div.find('strong', string='Cache per CPU Package:')
            if cache_info and cache_info.parent:
                cpu_info['cache'] = cache_info.parent.get_text().replace('Cache per CPU Package:', '').strip()

            # Get performance ratings
            right_desc = desc_div.select_one('.right-desc')
            if right_desc:
                multi_div = right_desc.find('div', string='Multithread Rating')
                if multi_div and multi_div.find_next_sibling('div'):
                    cpu_info['multithread_rating'] = int(multi_div.find_next_sibling('div').text.strip())

                single_div = right_desc.find('div', string='Single Thread Rating')
                if single_div and single_div.find_next_sibling('div'):
                    cpu_info['singlethread_rating'] = int(single_div.find_next_sibling('div').text.strip())

            # Get additional information from footer
            for p in desc_div.select('.desc-foot p'):
                text = p.get_text().strip()

                if 'CPU First Seen on Charts:' in text:
                    cpu_info['first_seen'] = text.split('CPU First Seen on Charts:')[1].strip()

                elif 'Last Price Change:' in text:
                    price_match = re.search(r'\$(\d+\.?\d*)', text)
                    if price_match:
                        cpu_info['price'] = float(price_match.group(1))
                    date_match = re.search(r'\((\d{4}-\d{2}-\d{2})\)', text)
                    if date_match:
                        cpu_info['price_date'] = date_match.group(1)

                elif 'CPUmark/$Price:' in text:
                    try:
                        cpu_info['cpumark_price_ratio'] = float(text.split('CPUmark/$Price:')[1].strip())
                    except ValueError:
                        pass

                elif 'Overall Rank:' in text:
                    cpu_info['overall_rank'] = text.replace('Overall Rank:', '').strip()

            return cpu_info

        except Exception as e:
            logger.error(f"Error parsing CPU details for {url}: {str(e)}")
            return None

    def save_to_csv(self, cpu_info: dict):
        """Save CPU information to CSV file"""
        try:
            with open(self.output_file, 'a', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=self.csv_headers)
                # Fill missing fields with None
                row = {header: cpu_info.get(header) for header in self.csv_headers}
                writer.writerow(row)
            logger.info(f"Saved data for {cpu_info.get('model_name', 'Unknown CPU')}")
        except Exception as e:
            logger.error(f"Error saving to CSV: {str(e)}")


def main():
    scraper = CPUBenchmarkScraper('cpu_benchmark_data.csv')

    # Get list of CPUs
    cpu_list = scraper.get_cpu_list()
    logger.info(f"Found {len(cpu_list)} CPUs")

    # Process each CPU
    for cpu in cpu_list:
        try:
            detail = scraper.get_cpu_detail(cpu['url'])
            if detail:
                scraper.save_to_csv(detail)
                logger.info(f"Processed: {detail.get('model_name', 'Unknown CPU')}")
            time.sleep(random.uniform(1, 2))  # Polite delay between requests
        except Exception as e:
            logger.error(f"Error processing {cpu['name']}: {str(e)}")
            continue


if __name__ == '__main__':
    main()