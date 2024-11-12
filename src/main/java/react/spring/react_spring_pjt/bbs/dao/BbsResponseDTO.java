package react.spring.react_spring_pjt.bbs.dao;

import java.util.ArrayList;

import lombok.Data;

// import lombok.Getter;
// import lombok.Setter;
// import lombok.ToString;

// @Setter
// @Getter
// @ToString

//@Data가 setter,getter,tostring을 포함

@Data
public class BbsResponseDTO {
    
    private Integer id ;
    private String title ;
    private String content ;

    private ArrayList<CommentResponseDTO> comment ;
}
