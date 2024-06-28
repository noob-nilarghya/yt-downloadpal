import styled from "styled-components";

const Wrapper= styled.div`
    padding: 1rem;
    border: 3px solid rgb(161 57 57);
    border-radius: 1rem;
    margin: 1rem;
    text-align: center;
    color: rgb(161 57 57);

    &>p{
        font-weight: bold;
    }
`;

function Error({msg}) {
    return (
        <Wrapper>
            <h1>{msg}</h1>
            <p>Reason: Invalid URL or Network error</p>
        </Wrapper>
    );
}

export default Error;
