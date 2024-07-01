
import styled from "styled-components";
import Search from "./Search";
import MoreTools from "./MoreTools";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { twitterDownloadAPI } from "../services/apiOtherVideo";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import Error from '../components/Error';
import TwitterPreview from "./TwitterPreview";

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

function TwitterDownload() {

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
    
    const {isFetching, data: twitterData, error, refetch} = useQuery({
        queryKey: ['twitter'],
        queryFn: () => twitterDownloadAPI(query),
        enabled: false, // Initialize useQuery with enabled set to false
        refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    });

    const twitterTrackReg = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
    const xTrackReg = /(?:http:\/\/)?(?:www\.)?x\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;

    // On clicking enter button, useQuery should be refetched
    function onClickEnter(evt){
        if(evt.key === 'Enter'){
            if(!query || (!twitterTrackReg.test(query) && !xTrackReg.test(query))) {
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
        if(!query || (!twitterTrackReg.test(query) && !xTrackReg.test(query))) {
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

    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Download Any Media Content From X/Twitter</h1>
            <Search type="text" logo="twitter" placeholder="Enter tweet link here..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {error && <Error msg="Error getting playlist info" />}
            {twitterData && !error && <TwitterPreview data={twitterData} />}
            <MoreTools />
        </Content>
    );
}

export default TwitterDownload;
