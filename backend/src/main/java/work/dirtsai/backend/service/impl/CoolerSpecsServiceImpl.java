package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.CoolerSpecsMapper;
import work.dirtsai.backend.model.entity.CoolerSpecs;
import work.dirtsai.backend.service.CoolerSpecsService;

@Service
public class CoolerSpecsServiceImpl extends ServiceImpl<CoolerSpecsMapper, CoolerSpecs> implements CoolerSpecsService {

    @Override
    public Page<CoolerSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<CoolerSpecs> queryWrapper = new QueryWrapper<CoolerSpecs>()
                                            .orderByDesc("updated_time");

        Page<CoolerSpecs> coolerSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(coolerSpecsPage, queryWrapper);
    }
}
