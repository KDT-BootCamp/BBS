import styled from "styled-components";
import TextInput from "../ui/TextInput";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Button from "../ui/Button";
//import axios from "axios";
import api from '../api/axios';
import _ from 'lodash';

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

function BbsUpdatePage(props) {

    useEffect(() => {
        getBbs();
    },[]);

    const [originData, setOriginData] = useState({});
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const getBbs = async () => {
        
        try{
            const response = await api.get(`bbs/view/${id}`); 
            console.log("BbsViewPage debug >>> axios bbs get OK!! , " , response.data) ;
            setTitle(response.data.title);
            setContent(response.data.content);
            setOriginData({...response.data}); 
        }catch( err ) {
            console.log( err );
        }
    }

    const bbsUpdate = async (title, content) => {
        
        if(originData.title === title && originData.content === content){
            alert("변경 사항이 없습니다");
        }
        else {
            const partialData = {
                title : title,
                content : content
            }
            try {
                const response = await api.post(`bbs/update/${id}`, partialData);
                console.log(`BbsUpdatePage debug >>> bbsUpdate title : ${partialData.title} content : ${partialData.content}`);
                console.log(`BbsUpdatePage debug >>> origin title :${originData.title} content : ${originData.content}`);
                alert("글 수정");
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    const cancelHandler = () => {
        alert("글 수정취소");
        navigate(`/bbs-view/${id}`);
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    return (
        <Wrapper>
            <Container>
                <label> 제목 : </label>
                <TextInput height={20} value={title} onChange={titleHandler}>
                    {title}
                </TextInput>
                <label> 내용 : </label>
                <TextInput height={480} value={content} onChange={contentHandler}>
                    {content}
                </TextInput>
                <Button title="수정하기" onClick={(e) => bbsUpdate(title, content)}/>
                &nbsp;&nbsp;&nbsp;
                <Button title="수정취소" onClick={cancelHandler} />
            </Container>
        </Wrapper>
    )
}
export default BbsUpdatePage;