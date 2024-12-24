package work.dirtsai.backend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.model.entity.CaseSpecs;
import work.dirtsai.backend.service.CaseSpecsService;
import work.dirtsai.backend.utils.ResultUtils;

@RestController
@RequestMapping("/api/caseItem-specs")
public class CaseSpecsController {

    @Resource
    private CaseSpecsService caseSpecsService;


    /**
     * paginate cpu specs
     * @param page
     */
    @GetMapping("/page")
    public BaseResponse<Page<CaseSpecs>> pageCpuSpecs(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        Page<CaseSpecs> caseSpecsPage = caseSpecsService.getPageList(page, size);
        return ResultUtils.success(caseSpecsPage);
    }

}
