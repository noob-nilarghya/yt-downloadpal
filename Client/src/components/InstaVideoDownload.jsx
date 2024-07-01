
import styled from "styled-components";
import Search from "./Search";
import Preview from "./Preview";
import MoreTools from "./MoreTools";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { instaDownloadAPI } from "../services/apiOtherVideo";
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

function InstaVideoDownload() {

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

    const {isFetching, data: instaData, error, refetch} = useQuery({
        queryKey: ['instagram'],
        queryFn: () => instaDownloadAPI(query),
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

    const formatTitle= instaData?.title.split(' ').slice(0,6).join(' ')+"...";
    const thumbnailURL= instaData?.thumbnail;
    const extras= {
        duration: (instaData?.duration) ? instaData?.duration : null,
        medias: (instaData?.media) ? instaData?.media : null
    }

    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Download Instagram Video/Reel</h1>
            <Search type="text" logo="instagram" placeholder="Enter instagram video/reel link here..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {error && <Error msg="Error getting playlist info" />}
            {instaData && !error && <Preview title={formatTitle} extras={extras} type="fb-insta" social="insta" thumbnailURL={thumbnailURL}></Preview>}
            <MoreTools />
        </Content>
    );
}

export default InstaVideoDownload;
