package react.spring.react_spring_pjt.openApi.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Arrays;
@Data
@AllArgsConstructor // 생성된 모든 필드를 인수로하는 생성자 생성
public class ForecastItems {
    
    @JsonProperty("item")
    private List<ForecastItemDTO> items;


    @JsonCreator
    public ForecastItems(@JsonProperty("response") JsonNode node) {
        try{

            ObjectMapper mapper = new ObjectMapper();
            JsonNode itemNode = node.findValue("item");

            this.items = Arrays.stream(mapper.treeToValue(itemNode,ForecastItemDTO[].class)).toList();

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
