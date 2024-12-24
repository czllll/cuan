package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.CoolerSpecs;

public interface CoolerSpecsService extends IService<CoolerSpecs> {
    Page<CoolerSpecs> getPageList(Integer page, Integer size);
}
