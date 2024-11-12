import styled from "styled-components";

const Wrapper = styled.div`

    width: calc(100% - 32px);

    padding: 16px;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    justify-content: center;

    border: 1px solid grey;

    border-radius: 8px;

    cursor: pointer;

    background: white;

    :hover {

        background: lightgrey;

    }

`;

const TitleText = styled.p`

    font-size: 20px;

    font-weight: 500;

`;

function BbsList () {
    return (
        <Wrapper>
            <TitleText>
                각 bbsd의 타이틀 출력
            </TitleText>
        </Wrapper>
    )
}



