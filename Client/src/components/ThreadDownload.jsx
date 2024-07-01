

import styled from "styled-components";
import Search from "./Search";
import MoreTools from "./MoreTools";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { threadDownloadAPI } from "../services/apiOtherVideo";
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

const ThreadPreview= styled.div`
    width: fit-content;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    justify-items: flex-start;
    align-items: center;
    font-size: 1.8rem;
    width: 95vw;
    width: 95dvw;
    max-width: 90rem;

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
const A = styled.a`
    text-decoration: none;
    border-radius: 2rem;
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 10rem;
    background-color: var(--color-white-110);
    color: var(--color-black-0);
    text-align: center;
    border: 1px solid var(--color-white-0);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    margin: 0 auto;
    transition: all 0.3s;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }

    &:hover{
        background-color: var(--color-green-80);
        box-shadow: var(--color-green-150) 0px 2px 8px 0px;
        color: var(--color-black-0);
    }
`;

const MediaDiv= styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function ThreadDownload() {

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
    
    const {isFetching, data: threadData, error, refetch} = useQuery({
        queryKey: ['thread'],
        queryFn: () => threadDownloadAPI(query),
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

    let description="";
    if(threadData){
        description = Object.keys(threadData).map(key => {
            const count = threadData[key].length;
            return `${count} ${key}`;
        }).join(' and ');
    }
    console.log(threadData);

    return (
        <Content>
            <h1 style={{textAlign: "center"}}>Download Any Media Content From Thread</h1>
            <Search type="text" logo="thread" placeholder="Enter thread link here..." onClick={onClick} query={query} setQuery={setQuery}></Search>
            {error && <Error msg="Error getting playlist info" />}
            {threadData && !error && 
                <ThreadPreview>
                    <span style={{color: "#dcdc00"}}>This thread post has <b>{description}</b></span>
                    <span style={{borderBottom: "1.5px solid var(--color-white-0)", paddingBottom: "0.5rem"}}>Downloadable Media Available</span>
                    <div>
                        {Object.keys(threadData).map(key => {
                            const count = threadData[key].length;
                            if(count === 0) return null;
                            return (
                                <MediaDiv key={key}>
                                    <span>{count} {key} :</span>
                                    {threadData[key].map((item, index) => (
                                        <A key={index} href={item.download_url || item} target="_blank" rel="noopener noreferrer">{key.slice(0, -1)}{index+1}</A>
                                    ))}
                                </MediaDiv>
                            );
                        })}
                    </div>
                </ThreadPreview>}
            <MoreTools />
        </Content>
    );
}

export default ThreadDownload;
