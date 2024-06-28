import styled from "styled-components";

const Wrapper= styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 0 1.5rem 0;
`;

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

const DivContainer= styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;

`;

const Container= styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    gap: 2rem;
    border: 1px solid black;
    width: 20rem;
    padding: 1rem 2rem;
    text-align: center;
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;

    @media (max-width: 550px) {
        width: 15rem;
        padding: 1rem 1rem;
    }
    
    &:hover{
        &>p{
            transform: translateY(-5px);
            transition: all 0.8s;
        }
        &>img{
            transform: scale(1.2);
            transition: all 0.8s;
        }
    }
`;

const SupportedPF= styled.div`
    width: 40rem;
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    color: var(--color-text);
    padding: 0.2rem 2rem;
    background: linear-gradient(to right, transparent, #88cc88, transparent);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    &>img{
        width: 2rem;
    }

    @media (max-width: 550px) {
        margin-bottom: 1rem;
    }
`;


function FeaturesList() {
    return (
        <Wrapper>
            <H2>Features list:</H2>
            <SupportedPF>
                <span>Supported platforms: </span>
                <img src='/facebook.svg' alt="facebook"></img>
                <img src='/twitter.svg' alt="twitter"></img>
                <img src='/thread.svg' alt="thread"></img>
                <img src='/instagram.svg' alt="instagram"></img>
                <img src='/spotify.svg' alt="spotify"></img>
            </SupportedPF>
            <DivContainer>
                <Container>
                    <Img src="/videoDownload.svg" alt="Download Video"></Img>
                    <p>Multi-Platform Video Downloads</p>
                </Container>
                <Container>
                    <Img src="/playlistDetails.svg" alt="Playlist Info"></Img>
                    <p>YouTube Playlist's Informations</p>
                </Container>
                <Container>
                    <Img src="/song.svg" alt="songs"></Img>
                    <p>Spotify Music Downloads (mp3)</p>
                </Container>
            </DivContainer>
        </Wrapper>
    );
}

export default FeaturesList;
