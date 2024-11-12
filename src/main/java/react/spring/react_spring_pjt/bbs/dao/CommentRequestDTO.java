package react.spring.react_spring_pjt.bbs.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentRequestDTO {
    
    private String content ;
    private Integer bbsId ;

}