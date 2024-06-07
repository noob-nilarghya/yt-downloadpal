import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyledPageNotFound = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;
const Button = styled.button`
    border-radius: 1rem;
    font-size: 1.6rem;
    width: fit-content;
    text-align: center;
    border: 1px solid var(--color-white-120);
    color: var(--color-white-0);
    background-color: var(--color-green-200);
    padding: 0.6rem 1.8rem;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    display: inline;
    margin: 2rem auto;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    font-size: 1.8rem;
    text-align: center;
`;

function PageNotFound({ message }) {

    const pathname = window.location.pathname; let pageName;
    if (pathname === '/') { pageName = "video"; }
    else if (pathname === '/features/playlist-download') { pageName = "playlist" }
    else if (pathname === '/features' || pathname === '/features/playlist-len') { pageName = "playlist-len" }

    const navigate= useNavigate();

    useEffect(function () {
        const timer = setTimeout(() => {
            if(!pageName){ navigate('/'); }
            window.location.reload();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    function onClick() {
        if(!pageName){ navigate('/'); }
        else window.location.reload();
    }

    if (pageName == 'video') {
        return (
            <StyledPageNotFound>
                <Header></Header>
                <Content>
                    <img src='/error404.webp'></img>
                    <p style={{fontWeight: "bold"}}>{message}</p>
                    <p>Automatically returning to main page in 5 seconds, or click below</p>
                    <Button onClick={onClick}>Return</Button>
                </Content>
                <Footer></Footer>
            </StyledPageNotFound>
        );
    }

    return (
        <Content>
            <img src='/error404.webp'></img>
            <p>{message}</p>
            <p>Automatically returning to main page in 3 seconds, or click below</p>
            <Button onClick={onClick}>Return</Button>
        </Content>
    )

}

export default PageNotFound;
