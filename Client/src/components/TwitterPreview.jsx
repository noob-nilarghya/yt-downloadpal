
import styled from "styled-components";
import Form from "./Form";

const StyledPreview= styled.div`
    width: fit-content;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    justify-items: flex-start;
    align-items: center;
    font-size: 1.8rem;
    width: 95vw;
    width: 95dvw;
    max-width: 90rem;

    background: var(--color-white-50);
    box-shadow: 0 8px 32px 0 var(--color-blue-50);
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 2rem;
    border: 1px solid var(--color-white-100);

    @media (max-width: 300px){
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;

const A = styled.a`
    text-decoration: none;
    border-radius: 2rem;
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 10rem;
    background-color: var(--color-white-110);
    color: var(--color-black-0);
    text-align: center;
    border: 1px solid var(--color-white-0);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    transition: all 0.3s;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }

    &:hover{
        background-color: var(--color-green-80);
        box-shadow: var(--color-green-150) 0px 2px 8px 0px;
        color: var(--color-black-0);
    }
`;

const MediaContainer= styled.div`
    display: flex;
    gap: 1.5rem;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const Container= styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 3px solid var(--color-green-80);
    border-radius: 2rem;
    align-items: center;
`;
const DivImg= styled.div`
    width: 15rem;
    overflow: hidden;
    position: relative;
    border-radius: 2rem;

    &::before{
        position: absolute;
        content: "${(props) => props.type}";
        background-color: yellow;
        font-size: 1.2rem;
        padding: 0.2rem 1rem;
        width: 10rem;
        top: 5px;
        left: -20px;
        transform: rotate(-35deg);
        color: red;
        font-weight: bold;
        z-index: 99999;
    }

    &>img{
        width: 100%;
        transition: all 0.3s;
        overflow: hidden;
    }

    &:hover{
        &>img{
            transform: scale(1.2);
            opacity: 0.8;
        }
    }
`;

function TwitterPreview({data}) {
    return (
        <StyledPreview>
            <span> <b>Title : </b> {data.tweetText} </span>
            <div style={{display: "flex", gap: "5rem"}}>
                <span>Creator: {data.username}</span>
                <span>Followers: {data.followers}</span>
            </div>

            <MediaContainer>
                {data.media.map((item, index) => (
                    <Container key={index}>
                        <DivImg type={item.type.toUpperCase()}><img src={item.url} alt="x-image"/></DivImg>
                        <A href={item.downloadLink} target="_blank">Download</A>
                    </Container>
                ))}
            </MediaContainer>
        </StyledPreview>
    );
}

export default TwitterPreview;
