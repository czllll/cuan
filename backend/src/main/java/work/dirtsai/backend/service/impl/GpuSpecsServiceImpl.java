package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.GpuSpecsMapper;
import work.dirtsai.backend.model.entity.CpuSpecs;
import work.dirtsai.backend.model.entity.GpuSpecs;
import work.dirtsai.backend.service.GpuSpecsService;

@Service
public class GpuSpecsServiceImpl extends ServiceImpl<GpuSpecsMapper, GpuSpecs> implements GpuSpecsService {

    @Override
    public Page<GpuSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<GpuSpecs> queryWrapper = new QueryWrapper<GpuSpecs>()
                                            .orderByDesc("updated_time");

        Page<GpuSpecs> GpuSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(GpuSpecsPage, queryWrapper);
    }
}
