package work.dirtsai.backend.model.entity.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PcConfigAddRequest {
    /**
     * CPU型号
     */
    @NotBlank(message = "CPU型号不能为空")
    private String cpu;

    /**
     * 显卡型号
     */
    @NotBlank(message = "显卡型号不能为空")
    private String gpu;

    /**
     * 主板型号
     */
    @NotBlank(message = "主板型号不能为空")
    private String motherboard;

    /**
     * 内存型号
     */
    @NotBlank(message = "内存型号不能为空")
    private String ram;

    /**
     * 存储型号
     */
    @NotBlank(message = "存储型号不能为空")
    private String storage;

    /**
     * 电源型号
     */
    @NotBlank(message = "电源型号不能为空")
    private String psu;

    /**
     * 机箱型号
     */
    @NotBlank(message = "机箱型号不能为空")
    private String caseItem;

    /**
     * 散热器型号
     */
    @NotBlank(message = "散热器型号不能为空")
    private String cooler;

    /**
     * 总价格
     */
    @NotNull(message = "总价格不能为空")
    private BigDecimal totalPrice;
}