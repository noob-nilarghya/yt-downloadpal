
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const StyledPLitem= styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2rem 12rem auto 2rem;
    column-gap: 1rem;
    align-items: center;
    justify-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-white-150);
    border-radius: 1.5rem;

    @media (max-width: 350px) {
        grid-template-columns: 2rem 10rem auto 2rem;
    }
`;
const Input= styled.input`
    height: 1.8rem;
    width: 1.8rem;
    transition: box-shadow 0.3s;
    background: var(--color-white-200);
    &:checked { 
        box-shadow: var(--color-green-50) 0px 10px 36px 0px, var(--color-green-100) 0px 0px 0px 1px;
    }
    &:disabled{
        cursor: no-drop;
    }
`;

const Img= styled.img`
    width: 80%;
    justify-self: start;
    padding-left: 1rem;

    @media (max-width: 350px) {
        padding-left: 0.8rem;
    }
`;

function PLitem({position, list, register, isLoading}) {
    const {title, videoId, videoThumbnailURL} = list;
    const formatTitle=title.split(' ').slice(0,4).join(' ')+"...";
    return (
        <StyledPLitem>
            <span>{position}</span>
            <Img src={videoThumbnailURL} alt={`thumbnail-${position}`} />
            <span style={{justifySelf: "start"}}>{formatTitle}</span>
            <Input type="checkbox" id={videoId} name={videoId} value={videoId} {...register(videoId)} disabled={isLoading} />
        </StyledPLitem>
    );
}

export default PLitem;
