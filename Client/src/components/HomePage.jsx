import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";
import MoreTools from "./MoreTools";
import Preview from "./Preview";
import Spinner from './Spinner';
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVideoData } from "../services/apiYTvideo";
import { secFormatter } from "../utils/utility";
import toast from "react-hot-toast";
import PageNotFound from "./PageNotFound";
import { useEffect } from "react";


const StyledHomePage= styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;
const Content= styled.div`
    height: max-content;
    margin: 0 auto;


    @media (max-width: 1024px){
        padding: 8rem 0;
    }

    @media (max-width: 850px) {
        width: 95%;
    }
`;

function HomePage() {

    const [query, setQuery] = useState("");
    const [btnClicked, setBtnClicked] = useState(false);

    const {isFetching, data: videoData, error, refetch} = useQuery({
        queryKey: ['ytVideoData'],
        queryFn: () => getVideoData(query),
        enabled: false, // Initialize useQuery with enabled set to false
        refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    });

    // On clicking enter button, useQuery should be refetched
    function onClickEnter(evt){
        if(evt.key === 'Enter'){
            if(!query) {
                toast.error("Please provide a valid URL first");
                return;
            }
            setBtnClicked(true);
            setQuery("");
            refetch({ force: true, cancelRefetch: true, throwOnError: true, reset: true }); 
            // Enable the query and trigger data fetching when the button is clicked
        }
    }

    function onClick(){
        if(!query) {
            toast.error("Please provide a valid URL first");
            return;
        }
        setBtnClicked(true);
        setQuery("");
        refetch({ force: true, cancelRefetch: true, throwOnError: true, reset: true }); 
        // Enable the query and trigger data fetching when the button is clicked
    }

    useEffect(() => {
        window.addEventListener('keydown', onClickEnter);
        return () => window.removeEventListener('keydown', onClickEnter);
    });

    
    if(isFetching && btnClicked){ 
        return (
            <StyledHomePage>
                <Header />
                <Spinner></Spinner>
                <Footer />
            </StyledHomePage>
        ); 
    }

    if(videoData === "Error fetching data. Check URL or internet connection"){
        toast.error("Error fetching data. Check URL or internet connection");
        return (<PageNotFound message="Error fetching data. Check URL or internet connection"></PageNotFound>);
    }

    
    const title= (videoData && videoData.data) ? videoData.data.videoDetails.title : "No Title";
    const channelName= (videoData && videoData.data) ? videoData.data.videoDetails.author.name : "No Author";
    const duration= (videoData && videoData.data) ? secFormatter(Number(videoData.data.videoDetails.lengthSeconds)) : "0 second";
    const thumbnailURL= (videoData && videoData.data) ? videoData.data.videoDetails.thumbnails[3].url : "/default.webp";
    const videoURL= (videoData && videoData.data) ? videoData.data.videoDetails.video_url : "";

    const formatTitle=title.split(' ').slice(0,4).join(' ')+"...";
    const extras= {
        duration: duration,
        videoURL: videoURL
    }
    const tool1= {name1: "YT Playlist Info", src1: "/chart.svg", alt1: "chart", link1: "/features/playlist-len"};
    const tool2= {name2: "YT Playlist Download", src2: "/download.svg", alt2: "download", link2: "/features/playlist-download"};
    return (
        <StyledHomePage>
            <Header />
            <Content>
                <h1 style={{textAlign: "center"}}>Convert and Download YT video to mp3/mp4 easily</h1>
                <Search type="text" placeholder="Enter YT video link here ..." onClick={onClick} query={query} setQuery={setQuery}></Search>
                {videoData && <Preview title={formatTitle} channelName={channelName} extras={extras} type="video" thumbnailURL={thumbnailURL}></Preview>}
                <MoreTools tool1={tool1} tool2={tool2}></MoreTools>
            </Content>
            <Footer />
        </StyledHomePage>
    );
}

export default HomePage;
