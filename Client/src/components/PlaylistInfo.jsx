import styled from "styled-components";

const StyledPlaylistInfo= styled.div`
    width: fit-content;
    max-width: 80rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    font-size: 1.8rem;

    background: var(--color-white-50);
    box-shadow: 0 8px 32px 0 var(--color-blue-50);
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 2rem;
    border: 1px solid var(--color-white-100);

    @media (max-width: 255px){
        padding: 1rem 0.5rem;
        font-size: 1.6rem;
    }
`;

function PlaylistInfo({plInfo}) {
    const {totalLen, avgLen, len_1_25, len_1_50, len_1_75, len_2_00} = plInfo;
    return (
        <StyledPlaylistInfo>
            <h2 style={{borderBottom: "1px solid var(--color-white-0)"}}>Information:</h2>
            <span>Average length : {avgLen}</span>
            <span>Total length : {totalLen}</span>
            <span>At 1.25x : {len_1_25}</span>
            <span>At 1.50x : {len_1_50}</span>
            <span>At 1.75x : {len_1_75}</span>
            <span>At 2.00x : {len_2_00}</span>
        </StyledPlaylistInfo>
    );
}

export default PlaylistInfo;
