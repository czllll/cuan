package work.dirtsai.backend.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName(value = "pc_configs")
public class PcConfig implements Serializable {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * CPU型号
     */
    private String cpu;

    /**
     * 显卡型号
     */
    private String gpu;

    /**
     * 主板型号
     */
    private String motherboard;

    /**
     * 内存型号
     */
    private String ram;

    /**
     * 存储型号
     */
    private String storage;

    /**
     * 电源型号
     */
    private String psu;

    /**
     * 机箱型号
     */
    private String caseItem;

    /**
     * 散热器型号
     */
    private String cooler;

    /**
     * 总价格
     */
    private BigDecimal totalPrice;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    @TableLogic
    private Integer isDeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}