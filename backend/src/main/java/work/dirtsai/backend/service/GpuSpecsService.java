package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.GpuSpecs;

public interface GpuSpecsService extends IService<GpuSpecs> {
    Page<GpuSpecs> getPageList(Integer page, Integer size);
}
