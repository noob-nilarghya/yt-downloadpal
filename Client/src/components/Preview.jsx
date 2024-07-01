import styled from "styled-components";
import Form from "./Form";

const StyledPreview= styled.div`

    width: fit-content;
    max-width: 80rem;
    padding: 1rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: ${(props) => (props.type === 'fb-insta') ? "1fr 2fr" : "1fr 1fr"};
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
    justify-self: center;
    width: ${(props) => (props.isYT) ? "100%" : ((props.type === 'fb-insta') ? "18rem" : "24rem")};
    border-radius: 2rem 2rem 2rem 2rem;
    padding: 0.5rem;

    @media (max-width: 300px){
        width: 80%;
    }
`;

const A = styled.a`
    text-decoration: none;
    border-radius: 2rem;
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 18rem;
    background-color: var(--color-white-110);
    color: var(--color-black-0);
    text-align: center;
    border: 1px solid var(--color-white-0);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    grid-row: ${(props) => (props.type === 'fb-insa') ? "" : "4/5"};
    grid-column: ${(props) => (props.type === 'fb-insta') ? "" : "1/-1"};
    margin: 0 auto;
    margin-top: 1rem;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }
`;

const MediaContainer= styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
`;

function Preview({title, channelName, extras, type, social, thumbnailURL, isYT}) {
    const videoURL= (type === "video") ? extras.videoURL : ""; let thumbnail;
    if(social==="insta"){
        const PROXY_URL= import.meta.env.VITE_PROXY_URL;
        thumbnail= `${PROXY_URL}/${thumbnailURL}`;
    }
    else{ thumbnail= thumbnailURL; }
    

    const qualityFormat= function(media, social){
        if(social==="fb"){
            const mediaQuality= media.quality;
            const arr= mediaQuality.split('_');
            if(arr[0]==="sd"){ return "Low(SD)"; }
            else if(arr[0]==="hd"){ return "High(SD)"; }
            else if(arr[0]==='render'){ return arr[1]; }
            else if(arr[0]==='audio' || arr[0]=='audio/mp4' || arr[0]==='audio/mp3'){ return "Audio(mp4)"; }
            return "Others";
        }
        else if(social==="insta"){
            const quality= `${media.height}x${media.width}`
            return quality;
        }
    }

    return (
        <StyledPreview type={type}>
            <Img isYT={isYT} type={type} src={thumbnail} alt="previw img"/>
            <span> <b>Title : </b> {title} </span>
            {isYT ? <span><b>Channel Name : </b> {channelName}</span> : (extras.artist &&<span><b>Artist Name : </b> {extras.artist}</span>)}


            <div style={{display: "flex", flexDirection: "column"}}>
                {(extras.duration) && <span><b>Duration : </b> {extras.duration}</span>}
                {(isYT && extras.actualPlaylistLen) && <span><b>Number of videos : </b> {extras.actualPlaylistLen}</span>}
                {(isYT && extras.totalNumOfVideoes && extras.totalNumOfVideoes !== extras.actualPlaylistLen) && <span><b>Number of playable videos : </b> {extras.totalNumOfVideoes}</span>}
                {(isYT && extras.downloadableLen && extras.downloadableLen !== extras.actualPlaylistLen) && <span><b>Downloadable : </b> {extras.downloadableLen}</span>}
            </div>

            {type==="fb-insta" && 
                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    {extras.medias.length>0 ?
                        <>
                            <span style={{borderBottom: "1.5px solid var(--color-white-0)", paddingBottom: "0.5rem", width: "fit-content"}}>Available Download Formats: </span>
                            <MediaContainer>
                                {extras.medias.map((media, index) => <A type={type} style={{margin: "0", width: "10rem"}} key={index} href={media.link || media.url} target="_blank">{qualityFormat(media, social)}</A>)}
                            </MediaContainer>
                        </>
                        : <span style={{color: "rgb(161 57 57)", fontWeight: "bold"}}>No Downloadable Media Available</span>
                    }
                </div>
            }

            {(!isYT && type==='spotify') && <A href={extras.downloadLink}>Download Music</A>}
            
            {(type === "video" && extras.duration !== "0 second") && <Form url={videoURL}></Form>}
        </StyledPreview>
    );
}

export default Preview;
