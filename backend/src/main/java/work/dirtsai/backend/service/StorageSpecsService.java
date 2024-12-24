package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.StorageSpecs;

public interface StorageSpecsService extends IService<StorageSpecs> {
    Page<StorageSpecs> getPageList(Integer page, Integer size);
}
