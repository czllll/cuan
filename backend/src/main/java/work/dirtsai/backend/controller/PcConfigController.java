package work.dirtsai.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.request.PcConfigAddRequest;
import work.dirtsai.backend.service.PcConfigService;
import work.dirtsai.backend.utils.ResultUtils;
@RestController
@RequestMapping("/api")
public class PcConfigController {
    @Resource
    PcConfigService pcConfigService;

    @PostMapping("/pc-configs")
    public BaseResponse<Long> savePcConfig(@RequestBody PcConfigAddRequest pcConfigAddRequest) {
        Long id = pcConfigService.savePcConfig(pcConfigAddRequest);
        return ResultUtils.success(id);
    }
}
