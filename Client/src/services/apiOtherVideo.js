import axios from 'axios';

const secFormatter= (sec) => {  // sec --> hr:min:sec
    const h= Math.floor(sec/(60*60)); sec-=(h*60*60);
    const m= Math.floor(sec/60); sec-=(m*60);
    sec= Math.ceil(sec);

    if(h===0 && m===0) { return `${sec} seconds`; }
    if(h==0) { return `${m} minutes, ${sec} seconds`; }
    return `${h} hours, ${m} minutes, ${sec} seconds`;
}

export async function getTrackInfo(id, url){
    // url is already valid
    try{
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/tracks/',
            params: {
                ids: id
            },
            headers: {
                'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            },
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };

        const response = await axios.request(options);
        const finalData= {
            response: response,
            url: url
        }

        return finalData;
    }
    catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}

export async function spotifyDownloadAPI(url) {
    const data = new FormData();
    data.append('url', url);

    const spotifyTrackReg = /https?:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(spotifyTrackReg);

    try {
        if (!match) {
            throw new Error("Please provide a valid URL first");
        }
        const trackId = match[1];
        const trackData= await getTrackInfo(trackId, url);

        if(trackData.response.data.tracks[0]===null) {
            throw new Error("Please provide a valid URL first");
        }

        const options = {
            method: 'POST',
            url: 'https://all-video-downloader1.p.rapidapi.com/spotifydl',
            headers: {
                'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
                'x-rapidapi-host': 'all-video-downloader1.p.rapidapi.com'
            },
            data: data,
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };
        const res = await axios.request(options);

        const finalData= {
            trackInfo: {
                title: trackData.response.data.tracks[0].name.replace(/[\/\\:*?"<>|]/g, ''), // title sanitation
                duration: secFormatter(trackData.response.data.tracks[0].duration_ms/1000),
                artist: trackData.response.data.tracks[0].artists[0].name,
                image: trackData.response.data.tracks[0].album.images[1].url
            },
            downloadLink: res.data.result
        }

        return finalData;
    } 
    catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}

export async function getTweetInfo(id, url) {
    try {

        const options = {
            method: 'GET',
            url: 'https://twitter241.p.rapidapi.com/tweet',
            params: {
                pid: id
            },
            headers: {
                'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
                'x-rapidapi-host': 'twitter241.p.rapidapi.com'
            },
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };

        const res = await axios.request(options); 

        const finalData= {
            username: res.data.user.legacy.name,
            followers: res.data.user.legacy.followers_count,
            media: res.data.tweet?.entities?.media?.map((media) =>{
                if(media.ext_media_availability.status !== 'Available') { return null; }
                return {
                    type: media.type, 
                    url: media.media_url_https
                }
            }), 
            tweetURL: url
        }
        
        return finalData;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}

export async function twitterDownloadAPI(url) {
    const data = new FormData();
    data.append('url', url);   

    const twitterTrackReg = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
    const xTrackReg = /(?:http:\/\/)?(?:www\.)?x\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
    let match;

    if(url.includes('twitter')){
        match = url.match(twitterTrackReg);
    }
    else if(url.includes('x')){
        match = url.match(xTrackReg);
    }

    try {
        if (!match) {
            throw new Error("Please provide a valid URL first");
        }
        const id = match[1];
        const tweetData= await getTweetInfo(id, url);

        const options = {
            method: 'POST',
            url: 'https://all-video-downloader1.p.rapidapi.com/Twitter',
            headers: {
              'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
              'x-rapidapi-host': 'all-video-downloader1.p.rapidapi.com'
            },
            data: data,
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };
        
        const res = await axios.request(options);
        let media= [];
        for(let i=0; i<res.data.media.length; i++){
            media.push({
                type: tweetData?.media[i].type,
                url: tweetData?.media[i].url,
                downloadLink: res.data.media[i].url
            });
        }

        const finalData={
            username: tweetData.username,
            followers: tweetData.followers,
            tweetText: res.data.text,
            media: media
        }

        return finalData;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}


export async function threadDownloadAPI(url) {
    const data = new FormData();
    data.append('url', url);

    try {
        const options = {
            method: 'POST',
            url: 'https://all-video-downloader1.p.rapidapi.com/threadsdl',
            headers: {
              'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
              'x-rapidapi-host': 'all-video-downloader1.p.rapidapi.com'
            },
            data: data,
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };

        const response = await axios.request(options);
        const newObj = Object.keys(response.data.result).reduce((acc, key) => {
            const newKey = key.replace('_url', '');
            acc[newKey] = response.data.result[key];
            return acc;
        }, {});

        return newObj;

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}


export async function instaDownloadAPI(url) {

    try{
        const options = {
            method: 'GET',
            url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/post_info',
            params: {
              code_or_id_or_url: url
            },
            headers: {
              'x-rapidapi-key': '5361b2e21bmsh89be4c6691c90a0p1e5ee1jsnbbfb9ec5d37f',
              'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
            },
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };

        const response = await axios.request(options);

        if(response.data.success === false ){
            throw new Error(response.data.message);
        }

        const finalData={
            title: response.data.data.caption.text,
            thumbnail: response.data.data.thumbnail_url,
            duration: (response.data.data.video_duration) ? secFormatter(response.data.data.video_duration) : null,
            media: (response.data.data.video_versions) ? response.data.data.video_versions : null
        }

        return finalData;

    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}


export async function FBvideoDownloadAPI(url) {
    try{
        const options = {
            method: 'GET',
            url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/facebook',
            params: {
              url: url,
              filename: 'facebook-media(clipDroid)'
            },
            headers: {
              'x-rapidapi-key': '419b021896msh23067552e50b792p1430c5jsn658a515cc585',
              'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            },
            withCredentials: true,
            timeout: 120000 // 2 minutes timeout
        };

        const response = await axios.request(options);

        if(response.data.success === false ){
            throw new Error(response.data.message);
        }

        const finalData= {
            title: response.data.title,
            thumbnail: response.data.picture,
            media: response.data.links
        }

        return finalData;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        throw new Error(error.message);
    }
}