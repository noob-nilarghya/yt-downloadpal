import styled from "styled-components";
import Search from "./Search";
import Preview from "./Preview";
import PlaylistItems from "./PlaylistItems";
import MoreTools from "./MoreTools";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistDownloadInfo } from "../services/apiYTvideo";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Error from "../components/Error";

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

function PlaylistDwnldBody() {
    const [query, setQuery] = useState("");
    const [btnClicked, setBtnClicked] = useState(false);

    useEffect(() => {
        const timer= setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, []); // Empty dependency array ensures this effect runs only once

    const {isFetching, data: playlistDownloadData, error, refetch} = useQuery({
        queryKey: ['ytplaylistDownloadData'],
        queryFn: () => getPlaylistDownloadInfo(query),
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

    if(isFetching && btnClicked){ return <Spinner></Spinner>; }

    const title= (playlistDownloadData && playlistDownloadData.data) ? playlistDownloadData.data.data.title : "No Title";
    const channelName= (playlistDownloadData && playlistDownloadData.data) ? playlistDownloadData.data.data.channelName : "No Author";
    const actualPlaylistLen= (playlistDownloadData && playlistDownloadData.data) ? Number(playlistDownloadData.data.data.actualPlaylistLen) : 0;
    const downloadableLen= (playlistDownloadData && playlistDownloadData.data) ? Number(playlistDownloadData.data.data.downloadableLen) : 0;
    const thumbnailURL= (playlistDownloadData && playlistDownloadData.data) ? playlistDownloadData.data.data.thumbnailURL : "/default.webp";

    const formatTitle=title.split(' ').slice(0,4).join(' ')+"...";
    const extras= {
        actualPlaylistLen: actualPlaylistLen,
        downloadableLen: downloadableLen
    }

    const videoInfos= (playlistDownloadData && playlistDownloadData.data) ? playlistDownloadData.data.data.videoInfos : [];

    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Convert and Download YT Playlist to mp3/mp4 easily</h1>
            <Search type="text" logo="youtube" placeholder="Enter YT playlist link here ..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {error && <Error msg="Error getting playlist video(s)" />}
            {playlistDownloadData && !error && <Preview title={formatTitle} channelName={channelName} extras={extras} type="playlistLen" thumbnailURL={thumbnailURL}></Preview>}
            {playlistDownloadData && <PlaylistItems videoInfos={videoInfos} title={title}></PlaylistItems>}
            <MoreTools />
        </Content>
    );
}

export default PlaylistDwnldBody;
