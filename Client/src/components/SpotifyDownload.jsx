
import styled from "styled-components";
import Search from "./Search";
import Preview from "./Preview";
import MoreTools from "./MoreTools";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { spotifyDownloadAPI } from "../services/apiOtherVideo";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import Error from '../components/Error';

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

function SpotifyDownload() {
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

    // https://open.spotify.com/track/33LC84JgLvK2KuW43MfaNq
    const {isFetching, data: spotifyData, error, refetch} = useQuery({
        queryKey: ['spotify'],
        queryFn: () => spotifyDownloadAPI(query),
        enabled: false, // Initialize useQuery with enabled set to false
        refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    });

    const spotifyTrackReg = /https?:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;

    // On clicking enter button, useQuery should be refetched
    function onClickEnter(evt){
        if(evt.key === 'Enter'){
            if(!query || !spotifyTrackReg.test(query)) {
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
        if(!query || !spotifyTrackReg.test(query)) {
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

    const formatTitle=spotifyData?.trackInfo.title.split(' ').slice(0,4).join(' ')+"...";
    const extras= {
        artist: spotifyData?.trackInfo.artist,
        duration: spotifyData?.trackInfo.duration,
        downloadLink: spotifyData?.downloadLink
    }

    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Download Spotify Music</h1>
            <Search type="text" logo="spotify" placeholder="Enter spotify music link here..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {error && <Error msg="Error getting playlist info" />}
            {spotifyData && !error && <Preview title={formatTitle} extras={extras} type="spotify" thumbnailURL={spotifyData.trackInfo.image}></Preview>}
            <MoreTools />
        </Content>
    );
}

export default SpotifyDownload;
