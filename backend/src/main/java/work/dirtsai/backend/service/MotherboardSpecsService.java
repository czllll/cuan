package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.MotherboardSpecs;

public interface MotherboardSpecsService extends IService<MotherboardSpecs> {
    Page<MotherboardSpecs> getPageList(Integer page, Integer size);
}
