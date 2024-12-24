package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.RamSpecsMapper;
import work.dirtsai.backend.model.entity.RamSpecs;
import work.dirtsai.backend.service.RamSpecsService;

@Service
public class RamSpecsServiceImpl extends ServiceImpl<RamSpecsMapper, RamSpecs> implements RamSpecsService {

    @Override
    public Page<RamSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<RamSpecs> queryWrapper = new QueryWrapper<RamSpecs>()
                                            .orderByDesc("updated_time");

        Page<RamSpecs> ramSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(ramSpecsPage, queryWrapper);
    }
}
