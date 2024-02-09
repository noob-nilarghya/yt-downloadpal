import styled, { keyframes } from "styled-components";

const anime2 = keyframes`
    to{opacity: 0}
`;
const anime3 = keyframes`
    50% {background-position:right }
`;

const Loader1 = styled.div`
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    animation: ${anime2} 0.5s linear infinite alternate;

    &:before {
        content: "${(props) => props.downloadText}";
    }
`;

const Loader2 = styled.div`
    width: 120px;
    height: 20px;
    border-radius: 20px;
    background:
    radial-gradient(farthest-side,orange 94%,var(--color-white-0)) left/20px 20px no-repeat
    lightblue;
    animation: ${anime3} 1s infinite linear;
`;

function Loader({downloadText}) {
    return (
        <div style={{ gridColumn: "1/-1", width: "100%", display: "flex", gap: "0.8rem", flexDirection: "column", alignItems: "center", padding: "2rem 3rem" }}>
            <Loader2></Loader2>
            <Loader1 downloadText={downloadText}></Loader1>
        </div>
    );
}

export default Loader;
