import styled from "styled-components";
import Logo from "./Logo";
import ToggleDarkMode from "./ToggleDarkMode";
import Button from "./Button";

const StyledHeader= styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem 10rem;
    align-items: center;

    @media (max-width: 780px) {
        padding: 5rem 8rem;
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
`;

function Header({scrollTo, type}) {

    const handleClick= () => {
        if(type=="layout"){
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
        else scrollTo.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
        <StyledHeader>
            <Logo />
            <Container>
                <Button onClick={handleClick}>More tools</Button>
                <ToggleDarkMode />
            </Container>
        </StyledHeader>
    );
}

export default Header;
