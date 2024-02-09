import styled from "styled-components";
import Search from "./Search";
import Preview from "./Preview";
import MoreTools from "./MoreTools";
import PlaylistInfo from "./PlaylistInfo";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistInfo } from "../services/apiYTvideo";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Content= styled.div`
    height: max-content;
    padding: 0rem 2rem 0rem 2rem;

    @media (max-width: 255px){
        padding: 0;
    }

`;

function PlaylistLenBody() {
    const [query, setQuery] = useState("");
    const [btnClicked, setBtnClicked] = useState(false);

    const {isFetching, data: playlistData, error, refetch} = useQuery({
        queryKey: ['ytplaylistData'],
        queryFn: () => getPlaylistInfo(query),
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

    if(playlistData === "Error in getting playlist information"){
        toast.error("Error in getting playlist information");
        return (<PageNotFound message="Error in getting playlist information"></PageNotFound>);
    }
    
    const title= (playlistData && playlistData.data) ? playlistData.data.data.title : "No Title";
    const channelName= (playlistData && playlistData.data) ? playlistData.data.data.channelName : "No Author";
    const totalNumOfVideoes= (playlistData && playlistData.data) ? Number(playlistData.data.data.totalNumOfVideoes) : 0;
    const actualPlaylistLen= (playlistData && playlistData.data) ? Number(playlistData.data.data.actualPlaylistLen) : 0;
    const thumbnailURL= (playlistData && playlistData.data) ? playlistData.data.data.thumbnailURL : "/default.webp";

    const formatTitle=title.split(' ').slice(0,4).join(' ')+"...";
    const extras= {
        totalNumOfVideoes: totalNumOfVideoes,
        actualPlaylistLen: actualPlaylistLen
    }

    const totalLen= (playlistData && playlistData.data) ? playlistData.data.data.totalLen : "0 second";
    const avgLen= (playlistData && playlistData.data) ? playlistData.data.data.avgLen : "0 second";
    const len_1_25= (playlistData && playlistData.data) ? playlistData.data.data.len_1_25 : "0 second";
    const len_1_50= (playlistData && playlistData.data) ? playlistData.data.data.len_1_50 : "0 second";
    const len_1_75= (playlistData && playlistData.data) ? playlistData.data.data.len_1_75 : "0 second";
    const len_2_00= (playlistData && playlistData.data) ? playlistData.data.data.len_2_00 : "0 second";

    const plInfo= {
        totalLen: totalLen,
        avgLen: avgLen,
        len_1_25: len_1_25,
        len_1_50: len_1_50,
        len_1_75: len_1_75,
        len_2_00: len_2_00
    }


    const tool1= {name1: "YT Video Download", src1: "/youtube.svg", alt1: "youtube", link1: "/"};
    const tool2= {name2: "YT Playlist Download", src2: "/download.svg", alt2: "download", link2: "/features/playlist-download"};
    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Get YT Playlist info</h1>
            <Search type="text" placeholder="Enter YT playlist link here ..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {playlistData && <Preview title={formatTitle} channelName={channelName} extras={extras} type="playlistLen" thumbnailURL={thumbnailURL}></Preview>}
            {playlistData && <PlaylistInfo plInfo={plInfo}></PlaylistInfo>}
            <MoreTools tool1={tool1} tool2={tool2}></MoreTools>
        </Content>
    );
}

export default PlaylistLenBody;
