import styled from "styled-components";
import ForecastItem from "./ForecastItem";

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

function ForecastList(props) {
    return(
        <Wrapper>
            {   props.data.length === 0 ?
                <ForecastItem forecast="단기예보정보가 없습니다"/>
                :
                props.data.map( (forecast) => {
                return (
                    <ForecastItem
                        key = {Date.now()}
                        forecast ={`${forecast.category} - ${forecast.fcstValue}`} />
                );
            })}
        </Wrapper>
    );
}

export default ForecastList;