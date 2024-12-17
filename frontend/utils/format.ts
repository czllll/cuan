export const formatCpuSpecs = (specsString: string) => {
    const specs: ParsedSpecs = JSON.parse(specsString);
    return {
      "处理器核心": `${specs.cores}核${specs.threads}线程`,
      "基础频率": `${specs.base_clock}GHz`,
      "加速频率": `${specs.boost_clock}GHz`,
      "三级缓存": `${specs.cache_l3}MB`,
      "功耗": `${specs.tdp}W`,
      "接口": specs.socket,
      "PCIe": `PCIe ${specs.pcie_version}`,
      "内存支持": specs.memory_support.join("/"),
      ...(specs.has_igpu ? {"核显": specs.igpu_name} : {})
    }
  }