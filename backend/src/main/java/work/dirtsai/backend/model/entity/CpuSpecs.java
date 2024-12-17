package work.dirtsai.backend.entity;

import lombok.Data;

@Data
public class CpuSpecs {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String manufacturer;
    private String modelName;
    private Json specs;
    private double price;
}
