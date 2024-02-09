import styled from "styled-components";

const StyledButtonTools= styled.button`
    background-color: var(--color-green-80);
    width: 24rem;
    height: 5rem;
    font-size: 1.6rem;
    padding: 1rem 1.5rem;
    border-radius: 2rem;
    border: 1px solid var(--color-green-70);
    box-shadow: var(--color-green-150) 0px 2px 8px 0px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        box-shadow: var(--color-green-150) 0px 30px 60px -12px inset, var(--color-white-250) 0px 18px 36px -18px inset;
        font-size: 1.8rem;
    }

    @media (max-width: 450px) {
        width: 25rem;
    }

`;

function ButtonTools({children, onClick}) {
    return (
        <StyledButtonTools onClick={onClick}>
            {children}
        </StyledButtonTools>
    );
}

export default ButtonTools;
