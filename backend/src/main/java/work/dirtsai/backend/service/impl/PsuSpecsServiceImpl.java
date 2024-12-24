package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.PsuSpecsMapper;
import work.dirtsai.backend.model.entity.PsuSpecs;
import work.dirtsai.backend.service.PsuSpecsService;

@Service
public class PsuSpecsServiceImpl extends ServiceImpl<PsuSpecsMapper, PsuSpecs> implements PsuSpecsService {

    @Override
    public Page<PsuSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<PsuSpecs> queryWrapper = new QueryWrapper<PsuSpecs>()
                                            .orderByDesc("updated_time");

        Page<PsuSpecs> psuSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(psuSpecsPage, queryWrapper);
    }
}
