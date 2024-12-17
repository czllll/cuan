package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.CpuSpecs;

public interface CpuSpecsService extends IService<CpuSpecs> {
    Page<CpuSpecs> getPageList(Integer page, Integer size);
}
