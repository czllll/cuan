package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.MotherboardSpecsMapper;
import work.dirtsai.backend.model.entity.MotherboardSpecs;
import work.dirtsai.backend.service.MotherboardSpecsService;

@Service
public class MotherboardSpecsServiceImpl extends ServiceImpl<MotherboardSpecsMapper, MotherboardSpecs> implements MotherboardSpecsService {

    @Override
    public Page<MotherboardSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<MotherboardSpecs> queryWrapper = new QueryWrapper<MotherboardSpecs>()
                                            .orderByDesc("updated_time");

        Page<MotherboardSpecs> motherBoardSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(motherBoardSpecsPage, queryWrapper);
    }
}
