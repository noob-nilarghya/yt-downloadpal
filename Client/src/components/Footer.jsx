import styled from "styled-components";

const StyledFooter= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.4rem;
    padding: 3rem 5rem;
    font-size: 1.8rem;

    @media (max-width: 300px){
        flex-direction: column;
    }
`;

const ConncetMe= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;
const Anchor= styled.a`
    display: flex;
    align-items: center;
    transition: all 0.3s;
    &:hover{
        transform: scale(1.2);
    }
`;

function Footer() {
    return (
        <StyledFooter>
            <span>Made with 💗 by Nilarghya &nbsp;|| </span>
            <ConncetMe>
                <Anchor href="https://www.linkedin.com/in/nilarghya-roy-6a7637201/" target="_blank"><img src="/linkedin.svg" alt="linkedin" /></Anchor>
                <Anchor href="https://github.com/noob-nilarghya?tab=repositories" target="_blank"><img src="/github.svg" /></Anchor>
                <Anchor href="https://nilportfolio.onrender.com/" target="_blank"><img src="/link.svg" /></Anchor>
                <Anchor href="mailto:roynilarghya2001@gmail.com" target="_blank"><img src="/mail.svg" /></Anchor>
            </ConncetMe>
        </StyledFooter>
    );
}

export default Footer;
