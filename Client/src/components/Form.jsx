import styled, { keyframes } from "styled-components";
import { useForm } from 'react-hook-form';
import { downloadVideo } from "../services/apiYTvideo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./Loader";

const StyledForm = styled.div`
    grid-row: 4/5;
    grid-column: 1/-1;
    padding: 1rem 0;
    justify-self: center;

    @media (max-width: 300px){
        grid-row: 7/8;
    }
`;

const Option = styled.option`
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    background-color: var(--color-white-0);
    color: var(--color-black-0);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    text-align: center;
`;

const Select = styled.select`
    font-size: 1.5rem;
    width: 12rem;
    position: relative;
    border-radius: 2rem 0 0 2rem;
    padding: 0.5rem;
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

const Button = styled.button`
    border-radius: 0 2rem 2rem 0;
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 12rem;
    text-align: center;
    border: 1px solid var(--color-white-120);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;

    &:disabled{
        opacity: 0.7;
        cursor: no-drop;
    }
`;


// using react-hook-form

function Form({ url }) {
    const { register, handleSubmit, reset, getValues, formState } = useForm(); // coming from 'react-hook-form'
    const queryClient = useQueryClient();

    const [btnClicked, setBtnClicked] = useState(false);


    const { isLoading: isCreating, mutate } = useMutation({
        mutationFn: (newObj) => downloadVideo(newObj),
        onSuccess: (data) => {
            toast.success("Video downloaded successfully");

            // Handle success or any additional logic
            const blobData = data.blob;
            const fileName = data.fileName;

            if (!blobData) {
                toast.error("Blob data is undefined or null");
                return;
            }

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
        },
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            // onSettled is called regardless of success or failure
            queryClient.invalidateQueries({
                queryKey: ["ytVideoDownload"]
            });
            reset();
        }
    });



    function myOwnSubmitFn(data) { // onSubmit will trigger handleSubmit (provided by react-hook-form), which in tern will call 'myOwnSubmitFn'
        toast.success("Download started");
        setBtnClicked(true);
        mutate({ ...data, url: url });
    }

    function myOwnError(err) {
        console.log(err); // same as [const {errors} = formState();]
    }

    if (isCreating && btnClicked) { return (<Loader downloadText="Downloading"></Loader>); }

    return (
        <StyledForm>
            <form onSubmit={handleSubmit(myOwnSubmitFn, myOwnError)}>
                <Select name="format" id="format" defaultValue="mp4" {...register("format")} disabled={isCreating} >
                    <Option value="mp4">mp4 format</Option>
                    <Option value="mp3">mp3 format</Option>
                </Select>
                <Button disabled={isCreating}>Download</Button>
            </form>
            {/* TODO: As soon as the form is submitter, download will start. Here I want to display download progress just after from submit */}
        </StyledForm>
    );
}

export default Form;
