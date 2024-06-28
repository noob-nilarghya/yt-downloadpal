import styled from "styled-components";
import ButtonTools from "./ButtonTools";
import { useNavigate } from "react-router-dom";
import FeaturesList from "./FeaturesList";
import React, { forwardRef } from 'react';

const StyledMoreTools= styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;
const H2= styled.h2`
    font-size: 2.4rem;
    border-bottom: 1px solid var(--color-white-0);
    margin-bottom: 1rem;
    @media (max-width: 750px) {
        padding-top: 5rem;
    }
`;
const Container= styled.div`
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
    row-gap: 2rem;

    @media (max-width: 600px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const MoreTools = forwardRef((props, ref) => {
    const navigate= useNavigate();

    return (
        <StyledMoreTools ref={ref}>
            <FeaturesList></FeaturesList>
            <H2>More tools :</H2>
            <Container>
                <ButtonTools onClick={() => navigate('/') }><img src='/youtube.svg' alt='youtube' />&nbsp; YT Video Download</ButtonTools>
                <ButtonTools onClick={() => navigate('/features/playlist-len') }><img src='/chart.svg' alt='chart' />&nbsp; YT Playlist Info</ButtonTools>
                <ButtonTools onClick={() => navigate('/features/playlist-download') }><img src='/download.svg' alt='download' />&nbsp; YT Playlist Download</ButtonTools>
                <ButtonTools onClick={() => navigate('/') }><img style={{width: "16px"}} src='/facebook.svg' alt='facebook' />&nbsp; FB Video Download</ButtonTools>
                <ButtonTools onClick={() => navigate('/features/playlist-download') }><img style={{width: "16px"}} src='/thread.svg' alt='thread' />&nbsp; Thread Downloader</ButtonTools>
                <ButtonTools onClick={() => navigate('/features/playlist-len') }><img style={{width: "16px"}} src='/instagram.svg' alt='instagram' />&nbsp; IG Video Download</ButtonTools>
                <div style={{gridColumn: "1/-1", display: "flex", gap: "0.8rem", justifyContent: "center", alignItems: "center"}}>
                    <ButtonTools onClick={() => navigate('/') }><img style={{width: "16px"}} src='/twitter.svg' alt='x' />&nbsp; Twitter Downloader</ButtonTools>
                    <ButtonTools onClick={() => navigate('/features/playlist-download') }><img style={{width: "16px"}} src='/spotify.svg' alt='spotify' />&nbsp; Spotify Downloader</ButtonTools>
                </div>
            </Container>
            
        </StyledMoreTools>
    );
})

export default MoreTools;
