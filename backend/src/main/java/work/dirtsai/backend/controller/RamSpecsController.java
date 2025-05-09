package work.dirtsai.backend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.RamSpecs;
import work.dirtsai.backend.service.RamSpecsService;
import work.dirtsai.backend.utils.ResultUtils;

@RestController
@RequestMapping("/api/ram-specs")
public class RamSpecsController {

    @Resource
    private RamSpecsService ramSpecsService;


    /**
     * paginate cpu specs
     * @param page
     */
    @GetMapping("/page")
    public BaseResponse<Page<RamSpecs>> pageCpuSpecs(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        Page<RamSpecs> ramSpecsPage = ramSpecsService.getPageList(page, size);
        return ResultUtils.success(ramSpecsPage);
    }

}
