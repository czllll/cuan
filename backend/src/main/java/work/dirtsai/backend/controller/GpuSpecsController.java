package work.dirtsai.backend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.CpuSpecs;
import work.dirtsai.backend.model.entity.GpuSpecs;
import work.dirtsai.backend.service.CpuSpecsService;
import work.dirtsai.backend.service.GpuSpecsService;
import work.dirtsai.backend.utils.ResultUtils;

@RestController
@RequestMapping("/api/gpu-specs")
public class GpuSpecsController {

    @Resource
    private GpuSpecsService gpuSpecsService;


    /**
     * paginate cpu specs
     * @param page
     */
    @GetMapping("/page")
    public BaseResponse<Page<GpuSpecs>> pageCpuSpecs(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        Page<GpuSpecs> gpuSpecsPage = gpuSpecsService.getPageList(page, size);
        return ResultUtils.success(gpuSpecsPage);
    }

}
