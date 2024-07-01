import styled, {keyframes} from "styled-components";

const fadeInOut = keyframes`
  0%{ opacity: 0; }
  30%{ opacity: 1; }
  50%{ opacity: 1; }
  70%{ opacity: 1; }
  100%{ opacity: 0; }
`;

const StyledFooter= styled.div`
    margin: 0 auto;
    padding: 8rem 5rem 3rem 5rem;
    font-size: 2rem;

    @media (max-width: 1024px){
        padding: 3rem 5rem;
    }

    @media (max-width: 300px){
        flex-direction: column;
    }
`;

const ConncetMe= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    &>img{
        width: 2.4rem;
    }
`;
const Anchor= styled.a`
    display: flex;
    align-items: center;
    transition: all 0.3s;
    &:hover{
        transform: scale(1.2);
    }
`;

const Div= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    color: #fff;
    padding: 0.6rem 5rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 2rem;
    animation: ${fadeInOut} 3s infinite;
`;

function Footer() {
    return (
        <StyledFooter>
            <Div>
                <span>Made with &#128151; by Nilarghya</span>
                <ConncetMe>
                    <Anchor href="https://www.linkedin.com/in/nilarghya-roy-6a7637201/" target="_blank"><img src="/linkedin.svg" alt="linkedin" /></Anchor>
                    <Anchor href="https://github.com/noob-nilarghya?tab=repositories" target="_blank"><img src="/github.svg" /></Anchor>
                    <Anchor href="https://nilportfolio.onrender.com/" target="_blank"><img src="/link.svg" /></Anchor>
                    <Anchor href="mailto:roynilarghya2001@gmail.com" target="_blank"><img src="/mail.svg" /></Anchor>
                </ConncetMe>
            </Div>
        </StyledFooter>
    );
}

export default Footer;
