package work.dirtsai.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("case_specs")
public class CaseSpecs {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String manufacturer;
    private String modelName;
    private String specs;
    private double msrp;
    private String imageUrl;
}
