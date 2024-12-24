package work.dirtsai.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import work.dirtsai.backend.model.entity.CoolerSpecs;
import work.dirtsai.backend.model.entity.GpuSpecs;

@Mapper
public interface CoolerSpecsMapper extends BaseMapper<CoolerSpecs> {
}
