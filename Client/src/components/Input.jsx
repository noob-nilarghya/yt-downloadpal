import styled from "styled-components";

const StyledInput= styled.input`
    background-color: var(--color-white-30);
    width: 50vw;
    padding: 1.6rem 1rem;
    border: 1px solid var(--color-white-0);
    border-radius: 2rem 0rem 0rem 2rem;
    letter-spacing: 0.2rem;
    color: var(--color-white-0);
    font-size: 1.6rem;
    font-family: 'Nunito', sans-serif;

    &::placeholder{
        font-family: 'Nunito', sans-serif;
        color: var(--color-white-0);
        font-size: 1.6rem;
    }

    @media (max-width: 1000px) {
        width: 70vw;
    }

    @media (max-width: 700px) {
        width: 80vw;
    }
    
    @media (max-width: 450px) {
        width: 90vw;
    }

    @media (max-width: 400px) {
        width: 95vw;
    }

`;

function Input({type, placeholder, query, setQuery}) {
    return (
        <StyledInput type={type} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
    );
}

export default Input;
