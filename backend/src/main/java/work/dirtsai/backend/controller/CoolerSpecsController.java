package work.dirtsai.backend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.CoolerSpecs;
import work.dirtsai.backend.service.CoolerSpecsService;
import work.dirtsai.backend.utils.ResultUtils;

@RestController
@RequestMapping("/api/cooler-specs")
public class CoolerSpecsController {

    @Resource
    private CoolerSpecsService coolerSpecsService;


    /**
     * paginate cpu specs
     * @param page
     */
    @GetMapping("/page")
    public BaseResponse<Page<CoolerSpecs>> pageCpuSpecs(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        Page<CoolerSpecs> coolerSpecsPage = coolerSpecsService.getPageList(page, size);
        return ResultUtils.success(coolerSpecsPage);
    }

}
