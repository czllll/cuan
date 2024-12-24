package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.RamSpecs;

public interface RamSpecsService extends IService<RamSpecs> {
    Page<RamSpecs> getPageList(Integer page, Integer size);
}
