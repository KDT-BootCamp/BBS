import styled from "styled-components";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import ForecastList from "../list/ForecastList";

import api from '../api/axios';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function BbsForecastPage(props) {
    const navigate = useNavigate();
    const [time, setTime] = useState();
    const timeHandler = (e) => {
        setTime(e.target.value);
    }
    const [date, setDate] = useState();
    const dateHandler = (e) => {
        setDate(e.target.value);
    }
    const [num, setNum] = useState();
    const numHandler = (e) => {
        setNum(e.target.value);
    }
    const [list, setList] = useState([]);

    /* json-server version
    const bbsSave = async (title, content) => {
        const data = {
            id : Date.now(),
            title: title,
            content: content
        };
        try {
            const response = await api.post('http://localhost:8000/bbs', data);
            console.log("BbsWritePage debug >>> bbsSave reponse , ", response.data);
            alert("글 작성");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
        */

    // spring version

     const bbsForecast = async (time, date, num) => {
         //`bbs/forecast?base_time=${time}&base_date=${date}&beach_num=${num}`
        
        const data = {
            "base_time" : time,
            "base_date" : date,
            "beach_num" : num
        }

         try {
            const response = await api.get('bbs/forecast',{params : data});
            setList(response.data);
            console.log("BbsForecastPage debug >>> bbsForecast reponse ", response.data);
        
            if(response.status === 200){
                alert("기상 정보 출력 성공 !");
            } else {
                alert("기상 정보 출력 실패 !")
            }
            //alert("글 작성");
            //navigate("/");
        } catch (err) {
            console.log(err);
            setDate(err.response.data.base_date);
            setTime(err.response.data.base_time);
            setNum(err.response.data.beach_num);


        }
    }

    const cancelHandler = () => {
        alert("기상정보 확인 취소");
        navigate("/");
    }

    return (
        <Wrapper>
            <Container>
                <label> base_time : </label>
                <TextInput height={20} value={time} onChange={timeHandler} />
                <label> base_date : </label>
                <TextInput height={20} value={date} onChange={dateHandler} />
                <label> beach_num : </label>
                <TextInput height={20} value={num} onChange={numHandler} />

                <Button title="기입하기" onClick={(e) => bbsForecast(time,date,num)}/>
                &nbsp;&nbsp;&nbsp;
                <Button title="기입취소" onClick={cancelHandler} />
                
                <ForecastList data={list}></ForecastList>
            </Container>
        </Wrapper>
    )
}
export default BbsForecastPage;