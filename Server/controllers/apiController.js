
// https://www.youtube.com/watch?v={video_id_here}
// Unavailable video link for testing: https://www.youtube.com/watch?v=IeLN1s78MHk

const fs= require('fs');
const ytdl= require('ytdl-core');
const path= require('path');
const fetch= require('node-fetch');
const contentDisposition= require('content-disposition');
const { Readable } = require('stream');
const archiver = require('archiver');

const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// Helper function to concatinate readable streams [NOT REQUIRED]
class ConcatStream extends Readable {
    constructor(streams) {
        super();
        this.streams = streams;
        this.currentStream = null;
        this.processNextStream();
    }

    processNextStream() {
        if (this.streams.length > 0) {
            this.currentStream = this.streams.shift();
            this.currentStream.on('data', (chunk) => this.push(chunk));
            this.currentStream.on('end', () => this.processNextStream());
        } else {
            this.push(null); // No more streams to process
        }
    }

    _read() {
        // No need to implement anything here
    }
}

exports.testingRoute= async (req, res) => {
    res.status(200).json({success: true, message: 'Pinging from server'});
}

// Regex expression for YT URL
const rx= /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

// Validator of correct URL
const isYtUrl = (url) => {
    const ytRegex = new RegExp(rx);
    return ytRegex.test(url);
};

// Getting Video ID from URL
const getVideoId=  (url) => {
    if(!isYtUrl(url)){ return "Invalid URL"; }
    
    const id= ytdl.getURLVideoID(url);
    return id;
}

// Getting video info from video ID
exports.getVideoMetaInfo= async (req, res) => {
    try{
        
        const url= req.body.url;
        const id= getVideoId(url);

        if(id === "Invalid URL"){
            throw new Error("Invalid URL");
        }

        if(!ytdl.validateID(id)){
            res.status(404).json({success: false, error: `Error getting video info: ${error.message}`});
            return;
        }
        
        const resp= await ytdl.getInfo(id);

        res.status(200).json({success: true, data: resp});

    } catch(error){
        console.log(error.message);
        res.status(404).json({success: false, error: `Error getting video info: ${error.message}`});
    }
}

const sanitizeFileNameForHeader = (fileName) => {
    // Replace non-ASCII characters with a safe character, e.g., underscore
    return fileName.replace(/[^\x20-\x7E]/g, '_');
};

// Downloading video based on format specified [.mp3/ .mp4]
exports.downloadVideoContent= async (req, res) => {
    try{
        const url= req.body.url;
        const id= getVideoId(url);
        const fileType= '.'+req.body.fileType;

        if(!ytdl.validateID(id)){
            throw new Error("Video ID is invalid, please check the URL :(");
        }

        const result= await ytdl.getInfo(id);
        const {
            videoDetails: { title, videoId, uploadDate, likes, category, author, lengthSeconds},
        } = result;

        const itag= (fileType === '.mp4') ? "18" : "140";
        const format= ytdl.chooseFormat(result.formats, {quality: itag});

        const sanitizedTitle = title.replace(/[\/\\:*?"<>|]/g, ''); // Remove invalid characters
        const fileName = `${sanitizedTitle}${fileType}`;
        const sanitizedFileName = sanitizeFileNameForHeader(fileName);

        const stream= ytdl.downloadFromInfo(result, { format: format }) // it returns a readable stream
            // .on('progress', (chunkLength, downloaded, total) => {
            //     const download = (downloaded / 1024 / 1024).toFixed(2);
            //     const tot = (total / 1024 / 1024).toFixed(2);
            //     const progress = Math.ceil((download / tot) * 100);
            //     // console.log(`${download}MB of ${tot}MB\n`);

            // })
            // .pipe(fs.createWriteStream(filePath));

        // stream.on('finish', () => {
        //     console.log(`Video downloaded and saved as: ${fileName}`);
        //     res.status(200).json({success: true, message:`File downloaded successfully: ${filePath}`});
        // });
            
        // stream.on('error', (err) => {
        //     console.error(`Error downloading the video: ${err.message}`);
        //     res.status(500).json({success: false, message:`Error downloading video: ${err.message}`});
        // });

        const contentType= (fileType === '.mp4') ? 'video/mp4' : 'audio/mpeg';
        // res.setHeader('Content-Type', contentType);
        // res.setHeader('Content-Disposition', contentDisposition(`${fileName}`));
        // res.setHeader('X-Video-Title', fileName);
        // res.setHeader('Access-Control-Expose-Headers', 'X-Video-Title');
        const headers = {
            'Content-Type': contentType,
            'Content-Disposition': contentDisposition(`${fileName}`),
            'X-Video-Title': sanitizedFileName,
            'Access-Control-Expose-Headers': 'X-Video-Title'
        };

        // Set headers
        res.set(headers);

        stream.pipe(res);

    } catch (error){
        console.log(error.message);
        res.status(400).send({success: false, error:`Error downloading video: ${error.message}`});
    }
}

const PlURLtoIDextract= (url) => { // user's provided playlist URL to playlistID
    var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2]){
        return match[2];
    }
    return null;
}

// videoIDs of single page in playlist
const getSinglePageResult= async (url) => {
    const resp= await fetch(url);
    const data= await resp.json();

    return data;
}

const getPlaylistName= async (playlistID) => {
    const url= `${process.env.GOOGLE_YT_V3}/playlists?key=${process.env.YOUTUBE_KEY}&id=${playlistID}&part=id,snippet&fields=items(snippet(title,channelTitle))`;

    const resp= await fetch(url);
    const data= await resp.json();

    const finalData= {
        title: data.items[0].snippet.title,
        channelName: data.items[0].snippet.channelTitle
    }
    return finalData;
}

// videoIDs of all video in playlist
const getAllVideoIDsOfPlaylist = async (playlistURL) =>{
    try{
        const playlistID= PlURLtoIDextract(playlistURL);

        const {title, channelName} = await getPlaylistName(playlistID);
        let maxResults= 50; // number of result we need per page

        const urlToGetThumbnail= `${process.env.GOOGLE_YT_V3}/playlistItems?part=snippet&maxResults=1&playlistId=${playlistID}&key=${process.env.YOUTUBE_KEY}&fields=items(snippet(title,thumbnails(medium(url)))),pageInfo`;

        const respForThumbnail= await fetch(urlToGetThumbnail);
        const dataForThumbnail= await respForThumbnail.json();

        const thumbnailURL= dataForThumbnail.items[0].snippet.thumbnails.medium.url;
        const {totalResults} = dataForThumbnail.pageInfo;

        const baseURL= `${process.env.GOOGLE_YT_V3}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${process.env.YOUTUBE_KEY}`;
        const filters= `fields=items(snippet(resourceId(videoId))),prevPageToken,nextPageToken`;

        let url= `${baseURL}&${filters}`
        
        const videoIDs= [];

        while(1){
            const singlePageData= await getSinglePageResult(url);
            singlePageData.items.forEach((item)=>{
                videoIDs.push(item.snippet.resourceId.videoId);
            });

            const nextPageToken= singlePageData.nextPageToken;
            if(!nextPageToken) { break; } // this is the last page

            url= `${baseURL}&pageToken=${nextPageToken}&${filters}`;
        }

        const finalData= {
            title: title,
            channelName: channelName,
            videoIDs: videoIDs,
            totalNumOfVideoes: totalResults,
            thumbnailURL: thumbnailURL
        }
        
        return finalData;
    }
    catch(error){
        console.log(error.message);
    }
}

const ISOtoSec= (str) => { // ISO --> seconds
    const temp= str.replace(/(^PT|S$)/g, "").split(/[^\d]/).map((item) => item.length < 2 ? "0" + item : item).join(":").replace(/^0/, "");
    const durationArr= temp.split(':');
    const arrSize= durationArr.length; 
    let key= 's'; 
    let duration=0; // in sec

    for(let i= arrSize-1; i>=0; i--){
        if(key ==='s'){
            duration+=Number(durationArr[i]);
            key= 'm';
        }
        else if(key === 'm'){
            duration+=( Number(durationArr[i])*60 );
            key= 'h';
        }
        else if(key === 'h'){
            duration+=( Number(durationArr[i])*60*60 );
            key= 'd';
        }
        else if(key === 'd'){
            duration+= ( Number(durationArr[i])*60*60*24 );
        }
    }
    return duration;
}

const getVideoLen= async (videoID) => { // this is a promise
    const url= `${process.env.GOOGLE_YT_V3}/videos?id=${videoID}&part=contentDetails&key=${process.env.YOUTUBE_KEY}`;
    const resp= await fetch(url);
    const data= await resp.json();

    if(data.items.length === 0) { return -1; } // video is copyrighted or not available

    return ISOtoSec( data.items[0].contentDetails.duration );
}

const secFormatter= (sec) => {  // sec --> hr:min:sec
    const h= Math.floor(sec/(60*60)); sec-=(h*60*60);
    const m= Math.floor(sec/60); sec-=(m*60);

    if(h===0 && m===0) { return `${sec} seconds`; }
    if(h==0) { return `${m} minutes, ${sec} seconds`; }
    return `${h} hours, ${m} minutes, ${sec} seconds`;
}

const PlDurationUtil= (sec, totalNumOfVideoes) => { // sec --> hr:min:sec | Spd @1.25x, 1.5x, 1.75x, 2x | avg len
    const avgLenInSec= Math.ceil(sec/totalNumOfVideoes);
    const secAt1_25= Math.ceil(sec/1.25);
    const secAt1_50= Math.ceil(sec/1.5);
    const secAt1_75= Math.ceil(sec/1.75);
    const secAt2_00= Math.ceil(sec/2);

    const finalData= {
        totalLen: secFormatter(sec),
        avgLen: secFormatter(avgLenInSec),
        len_1_25: secFormatter(secAt1_25),
        len_1_50: secFormatter(secAt1_50),
        len_1_75: secFormatter(secAt1_75),
        len_2_00: secFormatter(secAt2_00),
    }
    return finalData;
}

exports.getPlaylistLen= async (req, res) => {
    try{
        const url= req.body.url; // playlist url
        let {title, channelName, videoIDs, totalNumOfVideoes, thumbnailURL} = await getAllVideoIDsOfPlaylist(url);
        const actualPlaylistLen= totalNumOfVideoes;
        let duration= 0;

        const promiseArr= [];
        videoIDs.forEach((id) => {
            promiseArr.push(getVideoLen(id));
        });

        const resolvedPromise= await Promise.all(promiseArr);

        resolvedPromise.forEach((item)=> {
            if(item === -1) { // video is copyrighted or not available
                totalNumOfVideoes--;
            }
            else { duration+=Number(item); }
        });

        const {totalLen, avgLen, len_1_25, len_1_50, len_1_75, len_2_00} = PlDurationUtil(duration, totalNumOfVideoes);

        const finalData= {
            title: title,
            channelName: channelName,
            totalNumOfVideoes: totalNumOfVideoes,
            totalLen: totalLen,
            avgLen: avgLen,
            len_1_25: len_1_25,
            len_1_50: len_1_50,
            len_1_75: len_1_75,
            len_2_00: len_2_00,
            actualPlaylistLen: actualPlaylistLen,
            thumbnailURL: thumbnailURL
        }

        res.status(200).json({success: true, data: finalData});
    } catch (error) {
        console.log(error.message);
        res.status(400).send({success: false, error:`Error getting playlist info: ${error.message}`});
    }
}

const getPlaylistTitleThumbnailVideoID= async (playlistURL) => {
    try{

        const playlistID= PlURLtoIDextract(playlistURL);

        const {title, channelName} = await getPlaylistName(playlistID);
        let maxResults= 50; // number of result we need per page

        const urlToGetThumbnail= `${process.env.GOOGLE_YT_V3}/playlistItems?part=snippet&maxResults=1&playlistId=${playlistID}&key=${process.env.YOUTUBE_KEY}&fields=items(snippet(title,thumbnails(medium(url)))),pageInfo`

        const respForThumbnail= await fetch(urlToGetThumbnail);
        const dataForThumbnail= await respForThumbnail.json();

        const thumbnailURL= dataForThumbnail.items[0].snippet.thumbnails.medium.url;
        const {totalResults} = dataForThumbnail.pageInfo;

        const baseURL= `${process.env.GOOGLE_YT_V3}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${process.env.YOUTUBE_KEY}`;
        const filters= `fields=items(snippet(title,resourceId(videoId),thumbnails(default(url)))),prevPageToken,nextPageToken`;

        let url= `${baseURL}&${filters}`


        const videoInfos= [];

        while(1){
            const singlePageData= await getSinglePageResult(url);
            singlePageData.items.forEach((item)=>{
                if(item && item.snippet && item.snippet.title && item.snippet.resourceId && item.snippet.resourceId.videoId && item.snippet.thumbnails && item.snippet.thumbnails.default && item.snippet.thumbnails.default.url){
                    videoInfos.push({
                        title: item.snippet.title, 
                        videoId: item.snippet.resourceId.videoId, 
                        videoThumbnailURL: item.snippet.thumbnails.default.url
                    });
                }
            });

            const nextPageToken= singlePageData.nextPageToken;
            if(!nextPageToken) { break; } // this is the last page

            url= `${baseURL}&pageToken=${nextPageToken}&${filters}`;
        }

        const finalData= {
            title: title,
            channelName: channelName,
            videoInfos: videoInfos,
            totalNumOfVideoes: totalResults,
            thumbnailURL: thumbnailURL
        }
        
        return finalData;

    } catch(error) {
        console.log(error.message);
    }
}

exports.getPlaylistDetails= async (req, res) => {
    try{
        const url= req.body.url; // playlist url
        let {title, channelName, videoInfos, totalNumOfVideoes, thumbnailURL} = await getPlaylistTitleThumbnailVideoID(url);

        const finalData= {
            title: title,
            channelName: channelName,
            videoInfos: videoInfos,
            actualPlaylistLen: totalNumOfVideoes,
            downloadableLen: videoInfos.length,
            thumbnailURL: thumbnailURL
        }
        res.status(200).json({success: true, data: finalData});

    } catch (error) {
        console.log(error.message);
        res.status(400).send({success: false, error:`Error getting playlist info: ${error.message}`});
    }
}

// Helper function to convert a stream to a Buffer
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

async function downloadVideo(videoID, fileType, archive) {
    try {

        if(!ytdl.validateID(videoID)){
            throw new Error("Video ID is invalid, please check the URL :(");
        }

        const result= await ytdl.getInfo(videoID);
        const {
            videoDetails: { title, videoId, uploadDate, likes, category, author },
        } = result;

        const itag= (fileType === '.mp4') ? "18" : "140";
        const format= ytdl.chooseFormat(result.formats, {quality: itag});
        // console.log(format);

        const sanitizedTitle = title.replace(/[\/\\:*?"<>|]/g, ''); // Remove invalid characters
        const fileName = `${sanitizedTitle}${fileType}`;
        // const filePath = path.join(downloadFolder, fileName);

        const stream= ytdl.downloadFromInfo(result, { format: format }) // it returns a readable stream

        archive.append(stream, {name: `${fileName}`});

    } catch (error) {
        console.error(`Error downloading video ${videoID}: ${error.message}`);
        return null;
    }
}


exports.downloadPlaylistContent= async (req, res) => {
    try{
        
        const downloadVideoIDs= req.body.videoIDs;
        const title= req.body.title + "-Playlist";
        const fileType= '.'+req.body.fileType;
        const sanitizedTitle = title.replace(/[\/\\:*?"<>|]/g, ''); // Remove invalid characters
        const zipFileName= `${sanitizedTitle}.zip`;

        const archive= archiver('zip', {zlib: {level: 9}});
        res.attachment(zipFileName);
        const contentType= 'application/zip';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', contentDisposition(`${zipFileName}`));
        res.setHeader('X-Video-Title', zipFileName);
        res.setHeader('Access-Control-Expose-Headers', 'X-Video-Title');
        archive.pipe(res);

        for(const videoID of downloadVideoIDs) {
            await downloadVideo(videoID, fileType, archive);
        }

        archive.finalize();

    } catch (error) {
        res.status(400).send({success: false, error:`Error downloading playlist: ${error.message}`});
    }
}

exports.notFound= async (req, res) => {
    res.status(400).send({success: false, error:`Page not found :(`});
}