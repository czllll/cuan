package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.CaseSpecs;

public interface CaseSpecsService extends IService<CaseSpecs> {
    Page<CaseSpecs> getPageList(Integer page, Integer size);
}
