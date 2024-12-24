package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.mapper.StorageSpecsMapper;
import work.dirtsai.backend.model.entity.StorageSpecs;
import work.dirtsai.backend.service.StorageSpecsService;

@Service
public class StorageSpecsServiceImpl extends ServiceImpl<StorageSpecsMapper, StorageSpecs> implements StorageSpecsService {

    @Override
    public Page<StorageSpecs> getPageList(Integer page, Integer size) {
        QueryWrapper<StorageSpecs> queryWrapper = new QueryWrapper<StorageSpecs>()
                                            .orderByDesc("updated_time");

        Page<StorageSpecs> storageSpecsPage = new Page<>(page, size);
        return baseMapper.selectPage(storageSpecsPage, queryWrapper);
    }
}
