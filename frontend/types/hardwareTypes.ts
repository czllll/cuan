// CPU 基础规格接口
export interface CpuSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// PSU 基础规格接口
export interface PsuSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// RAM 基础规格接口
export interface RamSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// Motherboard 基础规格接口
export interface MotherboardSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// Storage 基础规格接口
export interface StorageSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// Case 基础规格接口
export interface CaseSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// Cooler 基础规格接口
export interface CoolerSpecs {
    id: number;
    manufacturer: string;
    modelName: string;
    specs: string;
    msrp: number;
    imageUrl: string;
}

// GPU 基础规格接口
export interface GpuSpecs {
    id: number;
    manufacturer: string;
    modelName: string;  // 保持驼峰命名
    specs: string;      // API 返回的是字符串
    msrp: number;
    imageUrl: string;
}

// 解析后的 GPU specs 类型
export interface ParsedGpuSpecs {
    gpu: string;           // GPU型号，如 "RTX 4090"
    tdp: number;           // 功耗，单位W
    length: number;        // 显卡长度，单位mm
    memory: {
        size: number;      // 显存大小，单位GB
        type: string;      // 显存类型，如 "GDDR6X"
        bus_width: number; // 位宽，如 384
    };
    base_clock: number;    // 基础频率，MHz
    boost_clock: number;   // 加速频率，MHz
    pcie_version: string;  // PCIe版本，如 "4.0"
    cooling: {
        fans: number;      // 风扇数量
        length: number;    // 散热器长度
    };
    ports: {
        hdmi?: number;     // HDMI接口数量
        displayport?: number; // DP接口数量
        usb_c?: number;    // USB-C接口数量
    };
    power_connectors: {    // 电源接口
        type: string;      // 如 "8-pin" 或 "16-pin"
        count: number;     // 接口数量
    };
}

  // 解析后的 specs 类型
  export interface ParsedCpuSpecs {
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
// 解析后的 PSU specs 类型
export interface ParsedPsuSpecs {
    modular: string;          // 模组化程度，如 "Full"/"Semi"/"None"
    wattage: number;          // 额定功率，单位W
    fan_size: number;         // 风扇尺寸，单位mm
    efficiency: string;       // 电源认证等级，如 "80 PLUS Titanium"
    protection: string[];     // 保护功能列表
    connectors: {
        eps: number;          // EPS接口数量
        pcie: number;         // PCIe接口数量
        sata: number;         // SATA接口数量
    };
}

// 解析后的 RAM specs 类型
export interface ParsedRamSpecs {
    type: string;             // 内存类型，如 "DDR5"
    capacity: number;         // 容量，单位GB
    speed: number;           // 频率，单位MHz
    modules: number;         // 内存条数量
    timings: string;         // 时序，如 "32-39-39-102"
    voltage: number;         // 工作电压，单位V
}


export interface ParsedMotherboardSpecs {
    socket: string;          // CPU接口，如 "LGA 1700"
    chipset: string;         // 芯片组，如 "Z790"
    form_factor: string;     // 主板规格，如 "ATX"
    memory: {
        max_capacity: number; // 最大内存容量，单位GB
        slots: number;        // 内存插槽数量
        type: string;         // 支持的内存类型
    };
    pcie: {
        x16_slots?: number;   // PCIe x16插槽数量
        x8_slots?: number;    // PCIe x8插槽数量
        x4_slots?: number;    // PCIe x4插槽数量
        x1_slots?: number;    // PCIe x1插槽数量
    };
  }


// 解析后的 Storage specs 类型
export interface ParsedStorageSpecs {
    type: string;             // 存储类型，如 "SSD"/"HDD"
    form_factor: string;      // 规格，如 "M.2"/"2.5"
    interface: string;        // 接口类型，如 "PCIe 4.0"/"SATA III"
    capacity_gb: number;      // 容量，单位GB
    read_speed: number;       // 读取速度，单位MB/s
    write_speed: number;      // 写入速度，单位MB/s
    tbw: number;             // 总写入量，单位TB
}

// 解析后的 Case specs 类型
export interface ParsedCaseSpecs {
    form_factor: string[];    // 支持的主板规格列表
    dimensions: {
        height: number;       // 高度，单位mm
        width: number;        // 宽度，单位mm
        depth: number;        // 深度，单位mm
    };
    max_gpu_length: number;   // 显卡最大长度限制，单位mm
    max_cpu_cooler: number;   // CPU散热器最大高度限制，单位mm
    included_fans: number;    // 预装风扇数量
    fan_support: {
        "120mm": number;      // 支持的120mm风扇数量
        "140mm": number;      // 支持的140mm风扇数量
    };
}

export interface ParsedCoolerSpecs {
    type: string;             
    tdp_rating: number;       
    socket_support: string[]; 
    fan_speed: {
        min: number;         
        max: number;         
    };
    dimensions?: {            // 风冷的尺寸
        height: number;      
        width: number;       
        depth: number;       
    };
    radiator?: {             // 水冷的尺寸
        size: number;
        thickness: number;
    };
}
