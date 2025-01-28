package work.dirtsai.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import work.dirtsai.backend.common.BusinessException;
import work.dirtsai.backend.common.ErrorCode;
import work.dirtsai.backend.mapper.PcConfigMapper;
import work.dirtsai.backend.model.entity.PcConfig;
import work.dirtsai.backend.model.entity.request.PcConfigAddRequest;
import work.dirtsai.backend.service.PcConfigService;

import java.math.BigDecimal;

@Service
@Slf4j
public class PcConfigServiceImpl extends ServiceImpl<PcConfigMapper, PcConfig> implements PcConfigService {

    @Override
    public Long savePcConfig(PcConfigAddRequest pcConfigAddRequest) {
        if (pcConfigAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        PcConfig pcConfig = new PcConfig();
        BeanUtils.copyProperties(pcConfigAddRequest, pcConfig);

        // 校验价格
        if (pcConfigAddRequest.getTotalPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "价格必须大于0");
        }

        // 保存
        boolean result = this.save(pcConfig);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }

        return pcConfig.getId();
    }

    @Override
    public Page<PcConfig> getPageList(Integer page, Integer size) {
        // 分页查询
        Page<PcConfig> paginationData = new Page<>(page, size);
        return this.page(paginationData, new LambdaQueryWrapper<PcConfig>()
                .orderByDesc(PcConfig::getCreateTime));
    }
}