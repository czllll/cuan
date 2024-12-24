package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.PsuSpecs;

public interface PsuSpecsService extends IService<PsuSpecs> {
    Page<PsuSpecs> getPageList(Integer page, Integer size);
}
