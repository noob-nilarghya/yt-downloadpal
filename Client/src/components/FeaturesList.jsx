import styled from "styled-components";

const H2= styled.h2`
    font-size: 2.4rem;
    border-bottom: 1px solid var(--color-white-0);
    margin-bottom: 1rem;
`;

const Img= styled.img`
    width: 4rem;    
    z-index: 100;
    transition: all 0.3s;

    &:hover{
        transform: scale(1.2);
    }
`;
const ImgDiv= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Container= styled.div`
    display: grid;
    grid-template-columns: 10rem 1fr;

    align-items: center;
`;


function FeaturesList() {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", padding: "3rem 0 1.5rem 0"}}>
            <H2>Features list:</H2>
            <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                <Container>
                    <ImgDiv><Img src="/videoDownload.svg" alt="Download Video"></Img></ImgDiv>
                    <p>Paste the video link, choose a format (mp3/mp4), download in just a click</p>
                </Container>
                <Container>
                    <ImgDiv><Img src="/playlistDetails.svg" alt="Playlist Info"></Img></ImgDiv>
                    <p>Get playlist info like total / avg length, duration @1.25,1.5,1.75,2x speed</p>
                </Container>
                <Container>
                    <ImgDiv><Img src="/playlistDownload.svg" alt="Download Playlist"></Img></ImgDiv>
                    <p>Pick all / selected videoes and format (mp3/mp4), download in just a click</p>
                </Container>
            </div>
        </div>
    );
}

export default FeaturesList;
