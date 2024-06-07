import styled from "styled-components";
import Form from "./Form";

const StyledPreview= styled.div`
    width: fit-content;
    padding: 1rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    justify-items: flex-start;
    align-items: center;
    font-size: 1.8rem;

    background: var(--color-white-50);
    box-shadow: 0 8px 32px 0 var(--color-blue-50);
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 2rem;
    border: 1px solid var(--color-white-100);

    @media (max-width: 300px){
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;

const Img= styled.img`
    grid-row: 1/span 3;
    width: 100%;
    border-radius: 2rem 2rem 2rem 2rem;
    padding: 0.5rem;

    @media (max-width: 300px){
        width: 80%;
    }
`;

function Preview({title, channelName, extras, type, thumbnailURL}) {
    const videoURL= (type === "video") ? extras.videoURL : ""; 
    return (
        <StyledPreview>
            <Img src={thumbnailURL} alt="previw img"/>
            <span> <b>Title : </b> {title} </span>
            <span><b>Channel Name : </b> {channelName}</span>

            <div style={{display: "flex", flexDirection: "column"}}>
                {(extras.duration) && <span><b>Duration : </b> {extras.duration}</span>}
                {(extras.actualPlaylistLen) && <span><b>Number of videos : </b> {extras.actualPlaylistLen}</span>}
                {(extras.totalNumOfVideoes && extras.totalNumOfVideoes !== extras.actualPlaylistLen) && <span><b>Number of playable videos : </b> {extras.totalNumOfVideoes}</span>}
                {(extras.downloadableLen && extras.downloadableLen !== extras.actualPlaylistLen) && <span><b>Downloadable : </b> {extras.downloadableLen}</span>}
            </div>
            
            {(type === "video" && extras.duration !== "0 second") && <Form url={videoURL}></Form>}
        </StyledPreview>
    );
}

export default Preview;
