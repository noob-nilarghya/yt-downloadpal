import styled from "styled-components";
import Logo from "./Logo";
import ToggleDarkMode from "./ToggleDarkMode";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StyledHeader= styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem 10rem;
    align-items: center;

    @media (max-width: 780px) {
        flex-direction: column;
        padding: 5rem 10rem;
        gap: 3rem;
    }

    @media (max-width: 300px) {
        padding: 5rem 0rem;
    }
`;

const Container= styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 2vw;
    align-items: center;

    @media (max-width: 780px) {
        width: 90vw;
        justify-content: center;
    }
    
    @media (max-width: 400px) {
        width: 100vw;
    }

`;

function Header() {
    const navigate= useNavigate();
    const pathname= window.location.pathname; let pageName;
    if(pathname === '/') { pageName="video"; }
    else if(pathname === '/features/playlist-download') { pageName="playlist" }
    else if(pathname === '/features' || pathname === '/features/playlist-len' ) { pageName="playlist-len" }
    
    return (
        <StyledHeader>
            <Logo />
            <Container>
                {pageName!=='video' && <Button onClick={() => navigate('/')}>Video/mp3 download</Button>}
                {pageName!=='playlist-len' && <Button onClick={() => navigate('/features/playlist-len')}>Playlist Length Info</Button>}
                {pageName!=='playlist' && <Button onClick={() => navigate('/features/playlist-download')}>Playlist Download</Button>}
                <ToggleDarkMode />
            </Container>
        </StyledHeader>
    );
}

export default Header;
