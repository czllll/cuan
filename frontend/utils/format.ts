import { ParsedCaseSpecs, ParsedCoolerSpecs, ParsedCpuSpecs, ParsedGpuSpecs, ParsedMotherboardSpecs, ParsedPsuSpecs, ParsedRamSpecs, ParsedStorageSpecs } from '@/types/hardwareTypes'

export const formatCpuSpecs = (specsString: string) => {
  const specs: ParsedCpuSpecs = JSON.parse(specsString)
  return {
    处理器核心: `${specs.cores}核${specs.threads}线程`,
    基础频率: `${specs.base_clock}GHz`,
    加速频率: `${specs.boost_clock}GHz`,
    三级缓存: `${specs.cache_l3}MB`,
    功耗: `${specs.tdp}W`,
    接口: specs.socket,
    PCIe: `PCIe ${specs.pcie_version}`,
    内存支持: specs.memory_support?.join('/') || "",
    ...(specs.has_igpu ? { 核显: specs.igpu_name } : {})
  }
}

export const formatGpuSpecs = (specsString: string) => {
  const specs: ParsedGpuSpecs = JSON.parse(specsString);
  return {
      "GPU型号": specs.gpu,
      "显存": `${specs.memory.size}GB ${specs.memory.type}`,
      "显存位宽": `${specs.memory.bus_width}bit`,
      "基础频率": `${specs.base_clock}MHz`,
      "加速频率": `${specs.boost_clock}MHz`,
      "功耗": `${specs.tdp}W`,
      "长度": `${specs.length}mm`,
      "PCIe": `PCIe ${specs.pcie_version}`
  }
}

export const formatPsuSpecs = (specsString: string) => {
  const specs: ParsedPsuSpecs = JSON.parse(specsString);
  return {
    "功率": `${specs.wattage}W`,
    "模组化": formatModular(specs.modular),
    "认证": specs.efficiency,
    "风扇": `${specs.fan_size}mm`,
    "接口": formatConnectors(specs.connectors),
    "保护": specs.protection?.join(", ")
  }
}

// 辅助函数：格式化模组化类型
const formatModular = (modular: string) => {
  const modularMap = {
    "Full": "全模组",
    "Semi": "半模组",
    "None": "非模组"
  };
  return modularMap[modular as keyof typeof modularMap] || modular;
}

// 辅助函数：格式化接口数量
const formatConnectors = (connectors: {
  eps: number;
  pcie: number;
  sata: number;
}) => {
  const parts = [];
  if (connectors.eps) parts.push(`${connectors.eps}×EPS`);
  if (connectors.pcie) parts.push(`${connectors.pcie}×PCIe`);
  if (connectors.sata) parts.push(`${connectors.sata}×SATA`);
  return parts.join(", ");
}



interface FormattedCoolerSpecs {
  类型: string;
  散热功率: string;
  风扇转速: string;
  支持接口: string;
  尺寸: string;
}

export const formatCoolerSpecs = (specsString: string): FormattedCoolerSpecs => {
  const specs: ParsedCoolerSpecs = typeof specsString === 'string' 
      ? JSON.parse(specsString) 
      : specsString;

  const result: FormattedCoolerSpecs = {
      "类型": formatCoolerType(specs.type),
      "散热功率": `${specs.tdp_rating}W`,
      "风扇转速": formatFanSpeed(specs.fan_speed),
      // "支持接口": specs?.socket_support?.join(", ") || "",
      "支持接口":  "",
      "尺寸": ""  // 先给一个默认值
  };

  // 根据散热器类型设置尺寸信息
  if (specs.type === "Air" && specs.dimensions) {
      result.尺寸 = `${specs.dimensions.height}×${specs.dimensions.width}×${specs.dimensions.depth}mm`;
  } else if (specs.type === "Liquid" && specs.radiator) {
      result.尺寸 = `${specs.radiator.size}×120×${specs.radiator.thickness}mm`;
  }

  return result;
}

const formatCoolerType = (type: string) => {
  return type === "Air" ? "风冷" : "水冷";
}

const formatFanSpeed = (fanSpeed: {
  min: number;
  max: number;
}) => {
  return `${fanSpeed.min}~${fanSpeed.max}RPM`;
}









export const formatRamSpecs = (specsString: string) => {
  const specs: ParsedRamSpecs = JSON.parse(specsString);
  return {
      "容量": `${specs.capacity}GB`,
      "类型": specs.type,
      "频率": `${specs.speed}MHz`,
      "时序": specs.timings,
      "电压": `${specs.voltage}V`,
      "条数": `${specs.modules}条`
  }
}




export const formatMotherboardSpecs = (specsString: string) => {
  const specs: ParsedMotherboardSpecs = JSON.parse(specsString);
  return {
      "芯片组": specs.chipset,
      "接口": specs.socket,
      "规格": specs.form_factor,
      "内存": formatMemorySlots(specs.memory),
      "PCIe": formatPcieSlots(specs.pcie)
  }
}

const formatMemorySlots = (memory: {
  max_capacity: number;
  slots: number;
  type: string;
}) => {
  return `${memory.slots}槽 ${memory.type} 最大${memory.max_capacity}GB`;
}

const formatPcieSlots = (pcie: {
  x16_slots?: number;
  x8_slots?: number;
  x4_slots?: number;
  x1_slots?: number;
}) => {
  const slots = [];
  if (pcie.x16_slots) slots.push(`${pcie.x16_slots}×PCIe x16`);
  if (pcie.x8_slots) slots.push(`${pcie.x8_slots}×PCIe x8`);
  if (pcie.x4_slots) slots.push(`${pcie.x4_slots}×PCIe x4`);
  if (pcie.x1_slots) slots.push(`${pcie.x1_slots}×PCIe x1`);
  return slots.join(", ");
}

// Storage formatter
export const formatStorageSpecs = (specsString: string) => {
  const specs: ParsedStorageSpecs = JSON.parse(specsString);
  return {
      "类型": specs.type,
      "容量": `${specs.capacity_gb}GB`,
      "接口": specs.interface,
      "尺寸": specs.form_factor,
      "读取速度": `${specs.read_speed}MB/s`,
      "写入速度": `${specs.write_speed}MB/s`,
      "寿命": `${specs.tbw}TBW`
  }
}

// Case formatter
export const formatCaseSpecs = (specsString: string) => {
  const specs: ParsedCaseSpecs = JSON.parse(specsString);
  return {
      "规格": specs.form_factor?.join("/"),
      "尺寸": formatCaseDimensions(specs.dimensions),
      "显卡限长": `${specs.max_gpu_length}mm`,
      "散热器限高": `${specs.max_cpu_cooler}mm`,
      "风扇位": formatFanSupport(specs.fan_support),
      "自带风扇": `${specs.included_fans}个`
  }
}



// Case辅助函数
const formatCaseDimensions = (dimensions: {
  height: number;
  width: number;
  depth: number;
}) => {
  return `${dimensions.height}×${dimensions.width}×${dimensions.depth}mm`;
}

const formatFanSupport = (fanSupport: {
  "120mm": number;
  "140mm": number;
}) => {
  const fans = [];
  if (fanSupport["120mm"]) fans.push(`${fanSupport["120mm"]}×120mm`);
  if (fanSupport["140mm"]) fans.push(`${fanSupport["140mm"]}×140mm`);
  return fans.join(", ");
}
