package react.spring.react_spring_pjt.bbs.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import react.spring.react_spring_pjt.bbs.dao.BbsMapper;
import react.spring.react_spring_pjt.bbs.dao.BbsRequestDTO;
import react.spring.react_spring_pjt.bbs.dao.BbsResponseDTO;
import react.spring.react_spring_pjt.bbs.dao.CommentRequestDTO;
import react.spring.react_spring_pjt.bbs.dao.CommentResponseDTO;

@Service
public class BbsService {
    
    @Autowired
    private BbsMapper bbsMapper ;

    public List<BbsResponseDTO> findAll() {
        System.out.println("debug >>> service findAll");
        return bbsMapper.findAllRow() ;
    }

    public void save(BbsRequestDTO request) {
        System.out.println("debug >>> service save : " + request);
        bbsMapper.saveRow(request);
    }

    public BbsResponseDTO show(Map<String,Integer> map) {
        System.out.println("debug >>> service showBbs : " + map);
    
        BbsResponseDTO responseDTO = bbsMapper.showRow(map);
        System.out.println("debug >>> service show non comments : " + responseDTO);

        ArrayList<CommentResponseDTO> comments = bbsMapper.showComments(map);
        responseDTO.setComment(comments);
        
        System.out.println("debug >>> service show result : " + responseDTO);
        
        return responseDTO;
    }

    public void commentSave(CommentRequestDTO comment){
        System.out.println("debug >>> service commentBbs : " + comment);
        
        bbsMapper.commentSaveRow(comment);

        System.out.println("debug >>> service success !! ");
        
    }

    public List<CommentResponseDTO> getComment(Map<String,Integer> map){
        System.out.println("debug >>> service getCommentBbsId : " + map);
 
        List<CommentResponseDTO> responseDTO = bbsMapper.getCommentRow(map);

        System.out.println("debug >>> response : " + responseDTO);
        System.out.println("debug >>> service success !! ");

        return responseDTO;
    }

    public void delete(Map<String,Integer> map){
        System.out.println("debug >>> service delete : " + map);
 
        bbsMapper.deleteRow(map);

        System.out.println("debug >>> service success !! ");
    }

    public void update(Map<String,Object> map){
        System.out.println("debug >>> service update : " + map);
        
        bbsMapper.updateRow(map);

        System.out.println("debug >>> service success !! ");
    }

}
