package react.spring.react_spring_pjt.bbs.ctrl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import react.spring.react_spring_pjt.bbs.dao.BbsRequestDTO;
import react.spring.react_spring_pjt.bbs.dao.BbsResponseDTO;
import react.spring.react_spring_pjt.bbs.dao.CommentRequestDTO;
import react.spring.react_spring_pjt.bbs.dao.CommentResponseDTO;
import react.spring.react_spring_pjt.bbs.service.BbsService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;





@RestController
@RequestMapping("/bbs")
public class BbsController {

    @Autowired
    private BbsService bbsService;


    @GetMapping("/index")   
    public ResponseEntity<Object> landing(){
        System.out.println("client endpoint >> /bbs/index");
        List<BbsResponseDTO> list = bbsService.findAll();
        System.out.println("debug >>> list : " + list);
        System.out.println("debug >>> list size : " + list.size()); 
        if(list.size() == 0 ){
            Map<String,String> map = new HashMap<>();
            map.put("info","데이터가 하나도 없숨다");
            return new ResponseEntity<>(map,HttpStatus.OK);    
        } else {
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> bbsSave(@RequestBody BbsRequestDTO requestDTO) {
        System.out.println("client endpoint >> /bbs/save");
        System.out.println("debug >>> request : " + requestDTO);
        
        bbsService.save(requestDTO);
        System.out.println("save success");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
           
    
    @GetMapping("/view/{id}")
    public ResponseEntity<BbsResponseDTO> bbsShow(@PathVariable(name="id") Integer id) {
        System.out.println("client endpoint >> /bbs/show");
        
        Map<String,Integer> map = new HashMap<>();
        map.put("id",id);
        System.out.println("debug >>> map : " + map);

        BbsResponseDTO responseDTO = bbsService.show(map);

        System.out.println("show success");        
        return new ResponseEntity<>(responseDTO,HttpStatus.OK);
    }
 
    
    @PostMapping("/comment/save")
    public ResponseEntity<Void> bbsComment(@RequestBody CommentRequestDTO comment) {
        System.out.println("client endPoint >> /bbs/comment/save");
        System.out.println("debug >>> request : " + comment);
        bbsService.commentSave(comment);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
 
    @GetMapping("/comment/getComment/{id}")
    public ResponseEntity<List<CommentResponseDTO>> getMethodName(@PathVariable(name = "id") Integer param) {
        System.out.println("client endPoint >> /bbs/comment/getComment");
        System.out.println("debug >>> request : " + param);
        
        Map<String,Integer> map = new HashMap<>() ;
        map.put("bbsid",param);

        List<CommentResponseDTO> list = bbsService.getComment(map);

        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> bbsDelete(@PathVariable(name = "id") Integer id) {
        System.out.println("client endPoint >> /bbs/delete");
        System.out.println("debug >>> request : " + id);
        Map<String,Integer> map = new HashMap<>();
        map.put("id",id);
        bbsService.delete(map);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Void> bbsUpdate(@RequestBody BbsRequestDTO requestDTO , @PathVariable(name="id") Integer id) {
        System.out.println("client endPoint >> /bbs/update");
        System.out.println("debug >>> request : " + requestDTO + " id : " + id );

        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("title", requestDTO.getTitle());
        map.put("content", requestDTO.getContent());

        bbsService.update(map);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
