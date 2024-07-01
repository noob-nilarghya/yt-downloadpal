import styled from "styled-components";
import Input from "./Input";

const Wrapper= styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const StyledSearch= styled.div`
    display: flex;
    padding: 3rem 5rem;
    padding-bottom: ${props => props.plInfo ? "1rem" : "3rem"};
    
    display: flex;
    justify-content: center;

    @media (max-width: 450px) {
        padding: 3rem 2rem;
        padding-bottom: ${props => props.plInfo ? "1rem" : "3rem"};
    }

    @media (max-width: 400px) {
        padding: 3rem 0rem;
        padding-bottom: ${props => props.plInfo ? "1rem" : "3rem"};
    }
`;
const Button= styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-white-0);
    transition: all 0.4s;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-white-0);
    border-radius: 0rem 2rem 2rem 0rem;
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    cursor: pointer;

    &>img{
        width: 20px;
        background-color: var(--color-green-80);
        border-radius: 1rem;
        padding: 0.2rem;
    }
    
    &:hover{
        background-color: var(--color-white-0);
        color: var(--color-black-0);
    }
    
`;

function Search({type, plInfo, placeholder, onClick, query, setQuery, logo}) {

    let src;
    if (logo === 'youtube') { src='/youtube.svg' }
    else if (logo === 'facebook') { src='/facebook.svg' }
    else if (logo === 'instagram') { src='/instagram.svg' }
    else if (logo === 'thread') { src='/thread.svg' }
    else if (logo === 'twitter') { src='/twitter.svg' }
    else if (logo === 'spotify') { src='/spotify.svg' }

    return (
        <Wrapper>
            <StyledSearch plInfo={plInfo}>
                <Input type={type} placeholder={placeholder} query={query} setQuery={setQuery}></Input>
                <Button onClick={onClick}><img src={src} alt={logo}></img>Search</Button>
            </StyledSearch>
            {plInfo && <span style={{paddingBottom: "2rem", color: "#eee"}}>Please provide a valid playlist link with not more than <b>{plInfo}</b> videos</span>}
        </Wrapper>
    );
}

export default Search;
