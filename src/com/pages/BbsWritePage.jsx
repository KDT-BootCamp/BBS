import TextInput from "../ui/TextInput";
import { useState } from 'react';
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios' ;

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

function BbsWritePage(props){

    const navigate = useNavigate();

    const [title,setTitle] = useState('');  
    const [content,setContent] = useState('');  
    const titleHandler = (e) => {
        setTitle(e.target.value) ;
    }
    const contentHandler = (e) => {
        setContent(e.target.value) ;
    }
    const cancelHandler = () => {
        alert("홈으로 이동합니다");
        navigate("/");
    }

    const bbsSave = async (title,content) => {
        const data = {
            id : Date.now(),
            title : title,
            content : content
        };
        try{
            const response = await axios.post('http://localhost:8000/bbs', data);
            console.log("debug >>>", response.data);
            navigate("/");
        } catch(err){
            console.log(err);
        }
    }

    return(

        <Wrapper>
            <Container>
                <label> 제목 :
                    <TextInput height={20} value={title} onChange={titleHandler}/>
                </label>
                <label> 내용 :
                    <TextInput height={480} value={content} onChange={contentHandler}/>
                </label>
                <Button title="글 작성하기" onClick={bbsSave}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button title="글 작성취소" onClik={cancelHandler}/>
            </Container>
        </Wrapper>
    );
}

export default BbsWritePage ;