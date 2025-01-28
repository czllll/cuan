'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download, Save } from 'lucide-react';
import Papa from 'papaparse';

interface HardwareDataType {
  [key: string]: string[];
}

interface PaginationType {
  [key: string]: {
    currentPage: number;
    totalPages: number;
    loading: boolean;
  };
}

interface SelectedConfigType {
  [key: string]: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

const HARDWARE_TYPES: {[key: string]: string} = {
  cpu: 'cpu-specs',
  gpu: 'gpu-specs',
  motherboard: 'motherboard-specs',
  ram: 'ram-specs',
  storage: 'storage-specs',
  psu: 'psu-specs',
  caseItem: 'caseItem-specs',
  cooler: 'cooler-specs'
};

const TrainingDataCollector: React.FC = () => {
  // 状态定义
  const [hardwareData, setHardwareData] = useState<HardwareDataType>({
    cpu: [],
    gpu: [],
    motherboard: [],
    ram: [],
    storage: [],
    psu: [],
    caseItem: [],
    cooler: []
  });
  
  // 统一的分页状态
  const [pagination, setPagination] = useState<PaginationType>(
    Object.keys(HARDWARE_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: {
        currentPage: 1,
        totalPages: 1,
        loading: false
      }
    }), {})
  );
  
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfigType>({
    cpu: '',
    gpu: '',
    motherboard: '',
    ram: '',
    storage: '',
    psu: '',
    caseItem: '',
    cooler: '',
    totalPrice: ''
  });
  
  const [savedConfigs, setSavedConfigs] = useState<SelectedConfigType[]>([]);

  // 通用的硬件数据获取函数
  const fetchHardwareData = async (type: string, page = 1, size = 10) => {
    try {
      setPagination(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: true }
      }));
      
      const response = await fetch(`${API_BASE_URL}/${HARDWARE_TYPES[type]}/page?page=${page}&size=${size}`);
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        const hardwareList = data.data.records.map(item => `${item.manufacturer} ${item.modelName}`);
        
        setHardwareData(prev => ({
          ...prev,
          [type]: page === 1 ? hardwareList : [...prev[type], ...hardwareList]
        }));
        
        setPagination(prev => ({
          ...prev,
          [type]: {
            currentPage: page,
            totalPages: Math.ceil(data.data.total / size),
            loading: false
          }
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setPagination(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: false }
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

  // 处理滚动加载更多
  const handleLoadMore = (type: string) => {
    if (!pagination[type].loading && pagination[type].currentPage < pagination[type].totalPages) {
      fetchHardwareData(type, pagination[type].currentPage + 1);
    }
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
        // 添加到本地列表
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
          caseItem: '',
          cooler: '',
          totalPrice: ''
        });
      } else {
        console.error('保存失败:', result);
        alert('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存出错:', error);
      alert('保存出错，请重试');
    }
  };

  // 导出CSV
  const handleExportCSV = () => {
    const csv = Papa.unparse(savedConfigs);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'pc_configurations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <select
                  id={type}
                  value={selectedConfig[type]}
                  onChange={(e) => handleConfigChange(type, e.target.value)}
                  className="w-full p-2 border rounded"
                  onScrollCapture={() => handleLoadMore(type)}
                >
                  <option value="">请选择{type}</option>
                  {hardwareData[type].map(item => (
                    <option 
                      key={item} 
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                  {pagination[type].loading && (
                    <option disabled>加载中...</option>
                  )}
                </select>
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
              onClick={handleExportCSV}
              variant="outline"
              className="flex items-center gap-2"
              disabled={savedConfigs.length === 0}
            >
              <Download className="w-4 h-4" />
              导出CSV
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