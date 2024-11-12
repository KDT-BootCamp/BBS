import styled from "styled-components";
import CommentItem from './CommentItem';
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props) {
    
    return (
        <Wrapper>
            {   props.comment.length === 0 ?
                
                <Wrapper>
                    <CommentItem data="타임라인이 없습니다"/>
                </Wrapper>
                :
                props.comment.map( (content) => {
                    return (
                        <CommentItem 
                            key={content.id}
                            data={content.content} />
                    );
            })}
        </Wrapper>
    );
}

export default CommentList;