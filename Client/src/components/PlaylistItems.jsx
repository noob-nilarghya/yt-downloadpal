import styled from "styled-components";
import PLitem from "./PLitem";
import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { downloadPlaylist } from "../services/apiYTvideo";
import toast from "react-hot-toast";
import Loader from "./Loader";

const StyledPlaylistItems= styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 0 2rem 0;
    width: fit-content;
    max-width: 100%;
`;

const Select = styled.select`
    font-size: 1.6rem;
    width: 14rem;
    position: relative;
    border-radius: 1rem;
    padding: 0.6rem 1rem;
    text-align: center;
    border: none;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }
`;
const Option= styled.option`
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    text-align: center;
`;

const Button= styled.button`
    border-radius: 1rem;
    font-size: 1.6rem;
    width: fit-content;
    text-align: center;
    border: 1px solid var(--color-white-120);
    color: var(--color-white-0);
    background-color: var(--color-green-200);
    padding: 0.6rem 1.8rem;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    display: inline;
    margin: 2rem auto;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }
`;

const ClickAllBtn= styled.button`
    margin-bottom: 2rem;
    margin-right: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 1rem 1rem 1rem 1rem;
    background-color: var(--color-green-80);
    border: 1px solid var(--color-green-70);
    box-shadow: var(--color-green-150) 0px 2px 8px 0px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
`;

function PlaylistItems({videoInfos, title}) {
    const {register, handleSubmit, reset, getValues, formState} = useForm(); // coming from 'react-hook-form'
    console.log(videoInfos);
    const queryClient= useQueryClient();

    const {isLoading, mutate} = useMutation({
        mutationFn: (newObj) => downloadPlaylist(newObj),
        onSuccess: () => {
            toast.success("Playlist downloaded successfully");
            queryClient.invalidateQueries({
                queryKey: ['ytPlaylistDownload']
            });
            reset();
        },
        onError: (err) => toast.error(err.message),
        onSettled: (data, error) => {
            // onSettled is called regardless of success or failure
            if (error) {
                // Handle error if needed
                toast.error("Download failed :(");
            } else {
                // Handle success or any additional logic
                const blobData = data.blob;
                const fileName = data.fileName;


                const url = URL.createObjectURL(blobData);
                const a = document.createElement('a'); // create a anchor tag

                a.href = url;
                a.download = fileName;
                // <a href={url} download={fileName}></a>

                function handleDownload() {
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                        a.removeEventListener('click', handleDownload);
                    }, 150);
                }

                a.addEventListener('click', handleDownload, false);
                a.click();
            }
        }
    });

    function myOwnSubmitFn(data){ // onSubmit will trigger handleSubmit (provided by react-hook-form), which in tern will call 'myOwnSubmitFn'
        // console.log(data); // This is the actual data of submitted form
        const videoIDs= [];
        Object.keys(data).forEach((key)=> {
            if(key!=='format' && data[key]!==false){ videoIDs.push(key); }
        });
        if(videoIDs.length === 0){ toast.error("Select atleast one video first"); return; }
        // console.log(videoIDs); --> These are the IDs of the video which user wants to download, and I'll pass it to backend. // TODO
        toast.success("Download started");
        mutate({videoIDs: videoIDs, format: data.format, title: title});
    }

    function myOwnError(err){
        console.log(err); // same as [const {errors} = formState();]
    }

    function downloadPlaylist_mp3() {
        const videoIDs= [];
        videoInfos.forEach((video)=> {
            videoIDs.push(video.videoId);
        });
        mutate({videoIDs: videoIDs, format: 'mp3', title: title});
    }

    function downloadPlaylist_mp4() {
        const videoIDs= [];
        videoInfos.forEach((video)=> {
            videoIDs.push(video.videoId);
        });
        mutate({videoIDs: videoIDs, format: 'mp4', title: title});
    }

    if (isLoading){
        return (
            <StyledPlaylistItems>
                <Loader downloadText="Zipping & Downloading"></Loader>
            </StyledPlaylistItems>
        );
    }
    

    return (
        <StyledPlaylistItems>
            <div style={{display: "flex", gap: "1rem"}}>
                <ClickAllBtn onClick={downloadPlaylist_mp3}>Download All in mp3 🎧</ClickAllBtn>
                <ClickAllBtn onClick={downloadPlaylist_mp4}>Download All in mp4 🎬</ClickAllBtn>
            </div>
            <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem"}} onSubmit={handleSubmit(myOwnSubmitFn, myOwnError)}>
                {videoInfos.map((list, index)=> <PLitem register={register} list={list} key={list.videoId} position={index+1} isLoading={isLoading} />)}
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    <Select name="format" id="format" defaultValue="mp4" {...register("format")} disabled={isLoading}>
                        <Option value="mp4">mp4 format</Option>
                        <Option value="mp3">mp3 format</Option>
                    </Select>
                    <Button disabled={isLoading}>Download Selected</Button>
                </div>
            </form>
        </StyledPlaylistItems>
    );
}

export default PlaylistItems;
