package react.spring.react_spring_pjt.openApi.ctrl;

import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;
import react.spring.react_spring_pjt.bbs.dao.ForecastRequestDTO;
import react.spring.react_spring_pjt.openApi.domain.ForecastItemDTO;
import react.spring.react_spring_pjt.openApi.service.ForecastService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.io.InputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.Map;
import java.util.HashMap;
@RestController
@RequestMapping("/bbs")
public class ForcastController {

    @Autowired
    private ForecastService forecastService;

    @Value("${openApi.serviceKey}")
    private String serviceKey ;

    @Value("${openApi.callBackUrl}")
    private String callBackUrl ;

    @Value("${openApi.dataType}")
    private String dataType ;

    @GetMapping("/forecast")
    public ResponseEntity<Object> callForecastApi(
        
       @Valid @RequestBody ForecastRequestDTO requestDTO, BindingResult bindingResult) {

        System.out.println("client Request path : /api/forecast");
        System.out.println("serviceKey >>> " + serviceKey);
        System.out.println("callBackUrl >>> " + callBackUrl);   
        System.out.println("dataType >>> " + dataType);
        System.out.println("params >>> " + requestDTO.getBase_date() + "\t" + requestDTO.getBase_time() + "\t" + requestDTO.getBeach_num());
    
        String requestUrl = callBackUrl + "?serviceKey="+serviceKey+
                                        "&dataType="+dataType+
                                        "&base_date="+requestDTO.getBase_date()+
                                        "&base_time="+requestDTO.getBase_time()+
                                        "&beach_num="+requestDTO.getBeach_num();
    
        System.out.println("url check >>>" + requestUrl);
       
        if(bindingResult.hasErrors()){
            System.out.println("debug >>> valiate error");

            List<ObjectError> list = bindingResult.getAllErrors();
            
            System.out.println(list);

            Map<String,String> map = new HashMap<>();

            for(int i = 0 ; i < list.size() ; i++){
                FieldError field = (FieldError)list.get(i);
                String msg = list.get(i).getDefaultMessage();
                System.out.println("debug >>> " + field.getField() + "\t" + msg);
                map.put(field.getField(),msg);
            }
            
            return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
        } else {

        HttpURLConnection http = null;
        InputStream       stream = null;
        String            result = null;
        List<ForecastItemDTO> list = null;

        try{

            URL url = new URL(requestUrl);
            http = (HttpURLConnection)url.openConnection();
            System.out.println("http connection : " + http);
            int code = http.getResponseCode();
            System.out.println("http response code = " + code);

            if(code == 200){
                stream = http.getInputStream(); //여기서 json 값을 바이너리로 받아오는듯
                result = readString(stream);
                System.out.println("result = " + result);

                list = forecastService.parsingJson(result);
                            
            }
        } catch(Exception e){
            e.printStackTrace();
        } finally{

        }
        return new ResponseEntity<>(list,HttpStatus.OK);
        }
    }
    public String readString(InputStream stream) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(stream,"UTF-8"));
        String input = null;
        StringBuilder result = new StringBuilder();
        while((input = br.readLine()) != null){
            result.append(input+"\n\r");
        }
        br.close();
        
        return result.toString() ;
    }
}
