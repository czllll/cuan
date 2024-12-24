package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.CaseSpecsMapper;
import work.dirtsai.backend.model.entity.CaseSpecs;
import work.dirtsai.backend.service.CaseSpecsService;

@Service
public class CaseSpecsServiceImpl extends ServiceImpl<CaseSpecsMapper, CaseSpecs> implements CaseSpecsService {

    @Override
    public Page<CaseSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<CaseSpecs> queryWrapper = new QueryWrapper<CaseSpecs>()
                                            .orderByDesc("updated_time");

        Page<CaseSpecs> caseSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(caseSpecsPage, queryWrapper);
    }
}
