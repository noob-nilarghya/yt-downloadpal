import axios from 'axios';

const BASE_URL= import.meta.env.VITE_SERVER_URL+"/api";

export async function getVideoData(url) {
    
    try {
        const response = await fetch(`${BASE_URL}/getVideoData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include', // equivalent to withCredentials: true in Axios
            body: JSON.stringify({ url: url }), // data that should be passed in API as body 
        });

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`Error fetching data. Check URL or internet connection`);
        }

        const data = await response.json();

        return data;

    } catch (err) {
        return err.message;
    }
}


export async function downloadVideo({ format, url }) {
    try {
        const apiUrl = `${BASE_URL}/downloadVideo`;
        const requestBody = {
            fileType: format,
            url: url,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        };

        // Make the POST request using fetch
        const response = await fetch(apiUrl, requestOptions);

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`Error in downloading video`);
        }

        const fileName= response.headers.get('X-Video-Title');
        const contentType = response.headers.get('Content-Type');

        if (!fileName || !contentType) {
            throw new Error(`Invalid response headers: ${JSON.stringify(response.headers)}`);
        }

        const blobData= await response.blob();

        return {blob: blobData, fileName: fileName};

    } catch (err) {
        return err.message;
    }
}

export async function getPlaylistInfo(url) {
    try {
        const res = await axios({
            method: 'POST',
            url: '/getPlaylistInfo',
            baseURL: BASE_URL,
            data: { url: url }, // data that should be passed in API as body 
            withCredentials: true
        });
        return res;
    } catch (error) {
        return "Error in getting playlist information";
    }
}

export async function getPlaylistDownloadInfo(url) {
    try {
        const res = await axios({
            method: 'POST',
            url: '/getPlaylistDownloadInfo',
            baseURL: BASE_URL,
            data: { url: url }, // data that should be passed in API as body 
            withCredentials: true
        });
        return res;
    } catch (error) {
        return "Can't retrieve playlist information";
    }
}

export async function downloadPlaylist({ format, videoIDs, title }) {
    // try {
    //     const res = await axios({
    //         method: 'POST',
    //         url: '/downloadPlaylist',
    //         baseURL: 'http://127.0.0.1:5000/api/',
    //         data: { fileType: format, videoIDs: videoIDs, title: title }, // data that should be passed in API as body 
    //         withCredentials: true
    //     });
    // } catch (err) {
    //     console.log(err.message);
    //     return null;
    // }

    try {
        const apiUrl = `${BASE_URL}/downloadPlaylist`;
        const requestBody = {
            fileType: format,
            videoIDs: videoIDs,
            title: title
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        };

        // Make the POST request using fetch
        const response = await fetch(apiUrl, requestOptions);

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`Error in downloading playlist`);
        }

        const fileName= response.headers.get('X-Video-Title');

        const blobData = await response.blob();

        return { blob: blobData, fileName: fileName };

    } catch (err) {
        return err.message;
    }
}