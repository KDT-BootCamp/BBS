package react.spring.react_spring_pjt.bbs.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BbsMapper {

    public List<BbsResponseDTO> findAllRow();
    
    public void saveRow(BbsRequestDTO requestDTO);

    public BbsResponseDTO showRow(Map<String,Integer> map);

    public ArrayList<CommentResponseDTO> showComments(Map<String,Integer> map);

    public void commentSaveRow(CommentRequestDTO requestDTO);

    public List<CommentResponseDTO> getCommentRow(Map<String,Integer> map);

    public void deleteRow(Map<String,Integer> map);

    public void updateRow(Map<String,Object> map);
}