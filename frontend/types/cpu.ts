export interface CpuSpecs {
    id: number;
    manufacturer: string;
    modelName: string;  // 注意这里是 modelName 而不是 model_name
    specs: string;  // API 返回的是字符串
    msrp: number;
    imageUrl: string;
  }
  
  // 解析后的 specs 类型
  export interface ParsedSpecs {
    tdp: number;
    cores: number;
    socket: string;
    threads: number;
    cache_l3: number;
    has_igpu: boolean;
    igpu_name?: string;
    base_clock: number;
    boost_clock: number;
    pcie_version: string;
    memory_support: string[];
    
  }