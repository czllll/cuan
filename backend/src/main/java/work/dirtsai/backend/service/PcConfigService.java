package work.dirtsai.backend.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import work.dirtsai.backend.model.entity.PcConfig;
import work.dirtsai.backend.model.entity.request.PcConfigAddRequest;

public interface PcConfigService extends IService<PcConfig> {

    /**
     * 保存PC配置
     * @param pcConfigAddRequest
     * @return
     */
    Long savePcConfig(PcConfigAddRequest pcConfigAddRequest);

    /**
     * 分页获取配置列表
     * @param page
     * @param size
     * @return
     */
    Page<PcConfig> getPageList(Integer page, Integer size);
}
