package work.dirtsai.backend.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import work.dirtsai.backend.common.BaseResponse;
import work.dirtsai.backend.mapper.*;
import work.dirtsai.backend.model.entity.*;
import work.dirtsai.backend.utils.ResultUtils;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

@AllArgsConstructor
public class ComponentSpecsController {

    private final CpuSpecsMapper cpuSpecsMapper;
    private final GpuSpecsMapper gpuSpecsMapper;
    private final MotherboardSpecsMapper motherboardSpecsMapper;
    private final RamSpecsMapper ramSpecsMapper;
    private final StorageSpecsMapper storageSpecsMapper;
    private final PsuSpecsMapper psuSpecsMapper;
    private final CaseSpecsMapper caseSpecsMapper;
    private final CoolerSpecsMapper coolerSpecsMapper;
    private final ObjectMapper objectMapper;

    private static final Set<String> VALID_TYPES = Set.of("case", "cooler", "cpu", "gpu", "motherboard", "psu", "ram", "storage");

    private void validateType(String type) {
        if (!VALID_TYPES.contains(type)) {
            throw new RuntimeException("Invalid component type: " + type);
        }
    }

    /**
     * 获取所有组件
     */
    @GetMapping("/{type}")
    public BaseResponse<List<?>> listAll(@PathVariable String type) {
        List<?> result = switch (type.toLowerCase()) {
            case "cpu" -> cpuSpecsMapper.selectList(null);
            case "gpu" -> gpuSpecsMapper.selectList(null);
            case "motherboard" -> motherboardSpecsMapper.selectList(null);
            case "ram" -> ramSpecsMapper.selectList(null);
            case "storage" -> storageSpecsMapper.selectList(null);
            case "psu" -> psuSpecsMapper.selectList(null);
            case "case" -> caseSpecsMapper.selectList(null);
            case "cooler" -> coolerSpecsMapper.selectList(null);
            default -> throw new IllegalArgumentException("Invalid component type: " + type);
        };
        return ResultUtils.success(result);
    }

    /**
     * 获取单个组件
     */
    @GetMapping("/{type}/{id}")
    public BaseResponse<?> getById(@PathVariable String type, @PathVariable Integer id) {
        validateType(type);

        Object result = switch (type.toLowerCase()) {
            case "cpu" -> cpuSpecsMapper.selectById(id);
            case "gpu" -> gpuSpecsMapper.selectById(id);
            case "motherboard" -> motherboardSpecsMapper.selectById(id);
            case "ram" -> ramSpecsMapper.selectById(id);
            case "storage" -> storageSpecsMapper.selectById(id);
            case "psu" -> psuSpecsMapper.selectById(id);
            case "case" -> caseSpecsMapper.selectById(id);
            case "cooler" -> coolerSpecsMapper.selectById(id);
            default -> throw new IllegalArgumentException("Invalid component type: " + type);
        };

        if (result == null) {
            throw new RuntimeException("Component not found");
        }

        return ResultUtils.success(result);
    }

    /**
     * 创建组件
     */
    @PostMapping("/{type}")
    public BaseResponse<?> create(@PathVariable String type, @RequestBody Map<String, Object> component) {
        validateType(type);

        try {
            // 将specs对象转换为JSON字符串
            Object specs = component.get("specs");
            if (!(specs instanceof String)) {
                component.put("specs", objectMapper.writeValueAsString(specs));
            }

            // 将Map转换为对应的实体类对象
            Object entity = switch (type.toLowerCase()) {
                case "cpu" -> objectMapper.convertValue(component, CpuSpecs.class);
                case "gpu" -> objectMapper.convertValue(component, GpuSpecs.class);
                case "motherboard" -> objectMapper.convertValue(component, MotherboardSpecs.class);
                case "ram" -> objectMapper.convertValue(component, RamSpecs.class);
                case "storage" -> objectMapper.convertValue(component, StorageSpecs.class);
                case "psu" -> objectMapper.convertValue(component, PsuSpecs.class);
                case "case" -> objectMapper.convertValue(component, CaseSpecs.class);
                case "cooler" -> objectMapper.convertValue(component, CoolerSpecs.class);
                default -> throw new IllegalArgumentException("Invalid component type: " + type);
            };

            // 插入数据
            boolean success = switch (type.toLowerCase()) {
                case "cpu" -> cpuSpecsMapper.insert((CpuSpecs) entity) > 0;
                case "gpu" -> gpuSpecsMapper.insert((GpuSpecs) entity) > 0;
                case "motherboard" -> motherboardSpecsMapper.insert((MotherboardSpecs) entity) > 0;
                case "ram" -> ramSpecsMapper.insert((RamSpecs) entity) > 0;
                case "storage" -> storageSpecsMapper.insert((StorageSpecs) entity) > 0;
                case "psu" -> psuSpecsMapper.insert((PsuSpecs) entity) > 0;
                case "case" -> caseSpecsMapper.insert((CaseSpecs) entity) > 0;
                case "cooler" -> coolerSpecsMapper.insert((CoolerSpecs) entity) > 0;
                default -> throw new IllegalArgumentException("Invalid component type: " + type);
            };

            if (!success) {
                throw new RuntimeException("Failed to create component");
            }

            return ResultUtils.success(entity);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process specs JSON", e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Failed to convert component data", e);
        }
    }

    /**
     * 更新组件
     */
    @PutMapping("/{type}/{id}")
    public BaseResponse<?> update(
            @PathVariable String type,
            @PathVariable Integer id,
            @RequestBody Map<String, Object> component
    ) {
        validateType(type);

        try {
            // 添加ID到组件数据
            component.put("id", id);

            // 将specs对象转换为JSON字符串
            Object specs = component.get("specs");
            if (!(specs instanceof String)) {
                component.put("specs", objectMapper.writeValueAsString(specs));
            }

            // 将Map转换为对应的实体类对象
            Object entity = switch (type.toLowerCase()) {
                case "cpu" -> objectMapper.convertValue(component, CpuSpecs.class);
                case "gpu" -> objectMapper.convertValue(component, GpuSpecs.class);
                case "motherboard" -> objectMapper.convertValue(component, MotherboardSpecs.class);
                case "ram" -> objectMapper.convertValue(component, RamSpecs.class);
                case "storage" -> objectMapper.convertValue(component, StorageSpecs.class);
                case "psu" -> objectMapper.convertValue(component, PsuSpecs.class);
                case "case" -> objectMapper.convertValue(component, CaseSpecs.class);
                case "cooler" -> objectMapper.convertValue(component, CoolerSpecs.class);
                default -> throw new IllegalArgumentException("Invalid component type: " + type);
            };

            // 更新数据
            boolean success = switch (type.toLowerCase()) {
                case "cpu" -> cpuSpecsMapper.updateById((CpuSpecs) entity) > 0;
                case "gpu" -> gpuSpecsMapper.updateById((GpuSpecs) entity) > 0;
                case "motherboard" -> motherboardSpecsMapper.updateById((MotherboardSpecs) entity) > 0;
                case "ram" -> ramSpecsMapper.updateById((RamSpecs) entity) > 0;
                case "storage" -> storageSpecsMapper.updateById((StorageSpecs) entity) > 0;
                case "psu" -> psuSpecsMapper.updateById((PsuSpecs) entity) > 0;
                case "case" -> caseSpecsMapper.updateById((CaseSpecs) entity) > 0;
                case "cooler" -> coolerSpecsMapper.updateById((CoolerSpecs) entity) > 0;
                default -> throw new IllegalArgumentException("Invalid component type: " + type);
            };

            if (!success) {
                throw new RuntimeException("Component not found or failed to update");
            }

            return ResultUtils.success(entity);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process specs JSON", e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Failed to convert component data", e);
        }
    }

    /**
     * 删除组件
     */
    @DeleteMapping("/{type}/{id}")
    public BaseResponse<Boolean> delete(@PathVariable String type, @PathVariable Integer id) {
        validateType(type);

        boolean success = switch (type.toLowerCase()) {
            case "cpu" -> cpuSpecsMapper.deleteById(id) > 0;
            case "gpu" -> gpuSpecsMapper.deleteById(id) > 0;
            case "motherboard" -> motherboardSpecsMapper.deleteById(id) > 0;
            case "ram" -> ramSpecsMapper.deleteById(id) > 0;
            case "storage" -> storageSpecsMapper.deleteById(id) > 0;
            case "psu" -> psuSpecsMapper.deleteById(id) > 0;
            case "case" -> caseSpecsMapper.deleteById(id) > 0;
            case "cooler" -> coolerSpecsMapper.deleteById(id) > 0;
            default -> throw new IllegalArgumentException("Invalid component type: " + type);
        };

        if (!success) {
            throw new RuntimeException("Component not found");
        }

        return ResultUtils.success(true);
    }
}