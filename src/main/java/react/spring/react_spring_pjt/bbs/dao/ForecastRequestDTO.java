package react.spring.react_spring_pjt.bbs.dao;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForecastRequestDTO {
    
    //validation annotation
    //NotNull, NotEmpty,NotBlank,Past,PastOrPresent,Email,Regular Expresstion(정규표현식)
    
    @NotBlank(message = "시간입력하세요")
    private String base_time;
    @NotBlank(message = "날짜입력하쇼")
    private String base_date;
    @NotBlank(message = "숫자입력하쇼")
    private String beach_num;
}
