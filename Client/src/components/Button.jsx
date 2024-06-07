import styled from "styled-components";

const StyledButton= styled.button`
    display: inline-block;
    font-size: 1.6rem;
    text-decoration: none;
    color: var(--color-white-0);
    transition: all 0.4s;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-white-0);
    border-radius: 2rem;
    background-color: transparent;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: var(--color-white-0);
        color: var(--color-black-0);
        transform: scale(1.1);
    }

    @media (max-width: 1024px) {
        font-size: 1.8rem;
    }

    @media (max-width: 500px) {
        padding: 1rem 1.5rem;
    }

    @media (max-width: 300px) {
        font-size: 1.6rem;
        padding: 1rem 1rem;
    }
`;

function Button({children, onClick}) {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    );
}

export default Button;
