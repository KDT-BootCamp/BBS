import styled from "styled-components";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
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

function BbsWritePage(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const titleHandler = (e) => {
        setTitle(e.target.value);
    }
    const [content, setContent] = useState('');
    const contentHandler = (e) => {
        setContent(e.target.value);
    }
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

    const bbsSave = async (title, content) => {
        const data = {
            title: title,
            content: content
        };
        try {
            const response = await api.post('bbs/save', data);
            console.log("BbsWritePage debug >>> bbsSave reponse , ", response.data);
            
            if(response.status === 204){
                alert("글 작성 후 홈으로 이동");
                navigate("/");
            } else {
                alert("데이터 저장 시 문제 발생 !!")
            }
            //alert("글 작성");
            //navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    const cancelHandler = () => {
        alert("글 작성취소");
        navigate("/");
    }

    return (
        <Wrapper>
            <Container>
                <label> 제목 : </label>
                <TextInput height={20} value={title} onChange={titleHandler} />
                <label> 내용 : </label>
                <TextInput height={480} value={content} onChange={contentHandler} />
                <Button title="글 작성하기" onClick={(e) => bbsSave(title, content)}/>
                &nbsp;&nbsp;&nbsp;
                <Button title="글 작성취소" onClick={cancelHandler} />
            </Container>
        </Wrapper>
    )
}
export default BbsWritePage;