package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.CpuSpecsMapper;
import work.dirtsai.backend.model.entity.CpuSpecs;
import work.dirtsai.backend.service.CpuSpecsService;

@Service
public class CpuSpecsServiceImpl extends ServiceImpl<CpuSpecsMapper, CpuSpecs> implements CpuSpecsService {

    @Override
    public Page<CpuSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<CpuSpecs> queryWrapper = new QueryWrapper<CpuSpecs>()
                                            .orderByDesc("updated_time");

        Page<CpuSpecs> cpuSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(cpuSpecsPage, queryWrapper);
    }
}
