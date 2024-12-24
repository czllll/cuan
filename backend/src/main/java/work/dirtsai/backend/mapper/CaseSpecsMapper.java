package work.dirtsai.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import work.dirtsai.backend.model.entity.CaseSpecs;

@Mapper
public interface CaseSpecsMapper extends BaseMapper<CaseSpecs> {
}
