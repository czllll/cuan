package work.dirtsai.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import work.dirtsai.backend.model.entity.CpuSpecs;

@Mapper
public interface CpuSpecsMapper extends BaseMapper<CpuSpecs> {
}
