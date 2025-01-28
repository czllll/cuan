'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download, Save } from 'lucide-react';
import Papa from 'papaparse';

const API_BASE_URL = 'http://localhost:8080/api';

const HARDWARE_TYPES = {
  cpu: 'cpu',
  gpu: 'gpu',
  motherboard: 'motherboard',
  ram: 'ram',
  storage: 'storage',
  psu: 'psu',
  caseItem: 'caseItem',
  cooler: 'cooler'
};

const TrainingDataCollector: React.FC = () => {
  // 状态定义
  const [hardwareData, setHardwareData] = useState<{[key: string]: string[]}>({
    cpu: [],
    gpu: [],
    motherboard: [],
    ram: [],
    storage: [],
    psu: [],
    case: [],
    cooler: []
  });
  
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({
    cpu: false,
    gpu: false,
    motherboard: false,
    ram: false,
    storage: false,
    psu: false,
    case: false,
    cooler: false
  });
  
  const [selectedConfig, setSelectedConfig] = useState<{[key: string]: string}>({
    cpu: '',
    gpu: '',
    motherboard: '',
    ram: '',
    storage: '',
    psu: '',
    case: '',
    cooler: '',
    totalPrice: ''
  });

  const [searchValues, setSearchValues] = useState<{[key: string]: string}>({
    cpu: '',
    gpu: '',
    motherboard: '',
    ram: '',
    storage: '',
    psu: '',
    case: '',
    cooler: ''
  });
  
  const [savedConfigs, setSavedConfigs] = useState<any[]>([]);

  // 通用的硬件数据获取函数
  const fetchHardwareData = async (type: string) => {
    try {
      setIsLoading(prev => ({
        ...prev,
        [type]: true
      }));
      
      const response = await fetch(`${API_BASE_URL}/${type}`);
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        const hardwareList = [...new Set(data.data.map((item: any) => `${item.manufacturer} ${item.modelName}`))];
        setHardwareData(prev => ({
          ...prev,
          [type]: hardwareList
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    } finally {
      setIsLoading(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  // 初始化数据加载
  useEffect(() => {
    Object.keys(HARDWARE_TYPES).forEach(type => {
      fetchHardwareData(type);
    });
  }, []);

  // 处理配置选择变化
  const handleConfigChange = (key: string, value: string) => {
    setSelectedConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 搜索过滤
  const getFilteredData = (type: string) => {
    const keyword = searchValues[type].toLowerCase();
    return hardwareData[type].filter(item => 
      item.toLowerCase().includes(keyword)
    );
  };

  // 保存配置
  const handleSaveConfig = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pc-configs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedConfig,
          totalPrice: Number(selectedConfig.totalPrice)
        })
      });
      
      const result = await response.json();
      if (result.code === 200) {
        const newConfig = {
          ...selectedConfig,
          id: result.data
        };
        setSavedConfigs(prev => [...prev, newConfig]);
        
        // 重置表单
        setSelectedConfig({
          cpu: '',
          gpu: '',
          motherboard: '',
          ram: '',
          storage: '',
          psu: '',
          case: '',
          cooler: '',
          totalPrice: ''
        });
      } else {
        alert('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存出错:', error);
      alert('保存出错，请重试');
    }
  };

  // 导出所有配置到CSV
  const handleExportAllCSV = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pc-configs/export`);
      const result = await response.json();
      
      if (result.code === 200 && result.data) {
        const csv = Papa.unparse(result.data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'all_pc_configurations.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('导出失败，请重试');
      }
    } catch (error) {
      console.error('导出错误:', error);
      alert('导出错误，请重试');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>PC配置训练数据收集</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(hardwareData).map(type => (
              <div key={type} className="space-y-2">
                <Label htmlFor={type}>{type.toUpperCase()}</Label>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder={`搜索${type}`}
                    value={searchValues[type]}
                    onChange={(e) => {
                      setSearchValues(prev => ({...prev, [type]: e.target.value}));
                    }}
                  />
                  <select
                    id={type}
                    value={selectedConfig[type]}
                    onChange={(e) => handleConfigChange(type, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">请选择{type}</option>
                    {getFilteredData(type).map((item, index) => (
                      <option key={`${type}-${item}-${index}`} value={item}>
                        {item}
                      </option>
                    ))}
                    {isLoading[type] && (
                      <option disabled>加载中...</option>
                    )}
                  </select>
                </div>
              </div>
            ))}
            
            <div className="space-y-2">
              <Label htmlFor="totalPrice">总价格</Label>
              <Input
                id="totalPrice"
                type="number"
                value={selectedConfig.totalPrice}
                onChange={(e) => handleConfigChange('totalPrice', e.target.value)}
                placeholder="输入总价格"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button 
              onClick={handleSaveConfig}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存配置
            </Button>
            
            <Button 
              onClick={handleExportAllCSV}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              导出所有配置
            </Button>
          </div>
        </CardContent>
      </Card>

      {savedConfigs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>已保存的配置 ({savedConfigs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedConfigs.map(config => (
                <div 
                  key={config.id}
                  className="p-4 border rounded bg-gray-50"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(config).map(([key, value]) => (
                      key !== 'id' && (
                        <div key={key}>
                          <span className="font-medium">{key}: </span>
                          {value}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingDataCollector;