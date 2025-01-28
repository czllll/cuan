package work.dirtsai.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.PcConfig;
import work.dirtsai.backend.model.entity.request.PcConfigAddRequest;
import work.dirtsai.backend.service.PcConfigService;
import work.dirtsai.backend.utils.ResultUtils;

import java.util.List;

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

    @GetMapping("/pc-configs/export")
    public BaseResponse<List<PcConfig>> exportAllConfigs() {
        List<PcConfig> allConfigs = pcConfigService.list();
        return ResultUtils.success(allConfigs);
    }
}
