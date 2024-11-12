import styled from "styled-components";
import Button from "../ui/Button";
import { useParams } from "react-router-dom";
//import axios from 'axios' ;
import api from '../api/axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";

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

const PostContainer = styled.div`

    padding: 8px 16px;

    border: 1px solid grey;

    border-radius: 8px;

`;

const TitleText = styled.p`

    font-size: 28px;

    font-weight: 500;

`;

const ContentText = styled.p`

    font-size: 20px;

    line-height: 32px;

    white-space: pre-wrap;

`;

const CommentLabel = styled.p`

    font-size: 16px;

    font-weight: 500;

`;

function BbsViewPage(props) {

    const navigate = useNavigate();
    const { id } = useParams();
    const [bbs,setBbs] = useState({});
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);

    console.log("BbsViewPage debug >>> params", id);

    const backMove = () => {
        navigate("/");
    }

    useEffect(()=>{
        getBbs();   
        //getComments();
    },[]) ;

    // const getBbs = async () => {
    //     try{
    //         const response = await api.get(`bbs/${id}`); 
    //         console.log("BbsViewPage debug >>> axios bbs get OK!! , " , response.data) ;
    //         setBbs(response.data);
    //     }catch( err) {
    //         console.log( err );
    //     }
    // }

    const getBbs = async () => {
        try{
            const response = await api.get(`bbs/view/${id}`); 
            console.log("BbsViewPage debug >>> axios bbs get OK!! , " , response.data) ;
            setBbs(response.data);
            setComments(response.data.comment);
        }catch( err ) {
            console.log( err );
        }
    }

    //axios url 다른 이유
    // const getComments = async () => {
    //     try{
    //         const response = await api.get(`comments?bbs_id=${id}`); 
    //         console.log("BbsViewPage debug >>> axios comment get OK!! , " , response.data) ;
    //         setComments(response.data);
    //     }catch( err) {
    //         console.log( err );
    //     }
    // }

     const getComments = async () => {
             try{
               const response = await api.get(`bbs/comment/getComment/${id}`); 
            console.log("BbsViewPage debug >>> axios comment get OK!! , " , response.data) ;
             setComments(response.data);
             setComment('');
         }catch( err) {
             console.log( err );
         }
     }

    const textHandler = (e) => {
        setComment(e.target.value);
    }

    // const postComment = async () => {
        
    //     if(comment === ''){
    //         alert("데이터를 입력해주세요");
    //     }
    //     else {
    //         const data = {
    //             "id" : id,
    //             "content" : comment,
    //             "bbs_id" : bbs.id
    //         }
    //         try{
    //             const response = await api.post('comments',data); 
    //             console.log("BbsViewPage debug >>> axios comment post OK!! , " , response.data) ;
    //             alert("comment 등록 완료");
    //             setComment('');

    //         }catch( err ) {
    //             console.log( err );
    //         }
    //     }
    // }

    const postComment = async () => {
        
        if(comment === ''){
            alert("데이터를 입력해주세요");
        }
        else {
            const data = {
                "content" : comment,
                "bbsId" : bbs.id
            }
            try{

                const response = await api.post('bbs/comment/save',data); 
                console.log("BbsViewPage debug >>> axios comment post OK!! , " , response.data) ;
                if(response.status === 204){
                    alert("등록 완료");
                    getComments();
                } else {
                    alert("등록 실패");
                }
                //alert("comment 등록 완료");
                //setComment('');
               
            }catch( err ) {
                console.log( err );
            }
        }
    }

    const reviseBbs = () => {
        navigate(`/bbs-update/${id}`);
        console.log("BbsViewPage debug >>> nav") ;
    }


    // const removeBbs = async () => {
    //     try{
    //         await api.delete(`bbs/${id}`);
    //         //await axios.delete(`http://localhost:8000/comments?bbs_id=${id}`);
    //         console.log("BbsViewPage debug >>> data delete");
    //         alert("comment 삭제 완료");
    //         navigate("/");
    //     } catch(err) {
    //         console.log(err);
    //     }

    // }

    const removeBbs = async () => {
        try{
            console.log("removeBbs cmment length >>> ", comments.length );
           // await api.delete(`bbs/${id}`);
            //await axios.delete(`http://localhost:8000/comments?bbs_id=${id}`);
            //console.log("BbsViewPage debug >>> data delete");
            if(comments.length === 0){
                await api.delete(`bbs/delete/${id}`);
                console.log("BbsViewPage debug >>> data delete");
                alert("comment 삭제 완료");
                
                navigate("/");
            } else {
                alert("comment 삭제 불가");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <Wrapper>
            <Container>
                <Button
                    title='뒤로 가기' onClick={backMove}/>
                <PostContainer>
                    <TitleText>{bbs.title}</TitleText>
                    <ContentText>{bbs.content}</ContentText>
                    <Button title='수정하기' onClick={reviseBbs}/> &nbsp;&nbsp;&nbsp;
                    <Button title='삭제하기' onClick={removeBbs}/>
                </PostContainer>

                <CommentLabel>타임라인</CommentLabel>
                <TextInput height={20} value={comment} onChange={textHandler}/>                
                <Button title='타임라인 등록하기' onClick={postComment} /> 
                <CommentList comment={comments}/>
            </Container>
            
        </Wrapper>
    );
}
export default BbsViewPage;