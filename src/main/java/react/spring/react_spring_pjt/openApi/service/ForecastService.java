package react.spring.react_spring_pjt.openApi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import react.spring.react_spring_pjt.openApi.domain.ForecastItemDTO;
import react.spring.react_spring_pjt.openApi.domain.ForecastItems;
import react.spring.react_spring_pjt.openApi.util.CategoryCode;

@Service
public class ForecastService {
    
    public List<ForecastItemDTO> parsingJson(String str) {
        //ObjectMapper를 통해 json -> java 객체, java 객체 -> json으로 변환시킴
        
        ObjectMapper mapper = new ObjectMapper(); 
        List<ForecastItemDTO> list = null;
        
        try{ 
        ForecastItems items = mapper.readValue(str,ForecastItems.class);
        //readValue는 str을 ForecastItems 객체로 만드는 것으로 생성자를 호출하는 것이라고 생각하면 됨
        list = items.getItems();
        // ForcastItems에서 List<ForecastItemDTO>를 가져옴
        System.out.println("service pasing json size = " + list.size());
        
        for(ForecastItemDTO forecast : list){
                decodeCategory(forecast);
        }    

        } catch(Exception e){
            e.printStackTrace();
        }

        return list;
    }

    private void decodeCategory(ForecastItemDTO item){
        String name = CategoryCode.valueOf(item.getCategory()).getName();
        String value = CategoryCode.getCodeValue(item.getCategory(),item.getFcstValue());
        String unit = CategoryCode.valueOf(item.getCategory()).getUnit();
    
        // System.out.println("name = " + name);
        // System.out.println("value = " + value);
        // System.out.println("unit = " + unit);

        item.setCategory(name);
        item.setFcstValue(value + unit);
    }

}
