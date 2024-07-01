
# YT-DownloadPal

Experience the convenience and versatility with our robust and responsive full-stack web application YT-DownloadPal. This a is your ultimate companion for effortlessly downloading content from YouTube, the premier video streaming platform, directly to your local device. With comprehensive support for both MP3 and MP4 formats, to ensures that you can enjoy your favorite media in the format of your choice.

It is equipped with various features like:


## Features

- <img src="Client/public/youtube.svg" alt="youtube" width="16" height="16"/> Download **YouTube Video** in mp3 and mp4 formats 
    - Paste the video link in the search box
    - Get the video info, choose the desired format
    - Download seamlessly with ease
- <img src="Client/public/youtube.svg" alt="youtube" width="16" height="16"/> Download **YouTube Playlist** in mp3 and mp4 format 
    - Paste the playlist link in the search box
    - Get individual video info of that playlist
    - Pick selected or all videos, choose the desired format
    - Conveniently download the whole playlist with just a click
- <img src="Client/public/youtube.svg" alt="youtube" width="16" height="16"/> Get **YouTube playlist information** 
    - Paste the playlist link in the search box
    - Get information of the playlist like:
        - Total duration
        - Average duration
        - Get duration of the playlist at `1.25x, 1.5x, 1.75x, 2x`
    - No limit on playlist size (works with playlist of any length)
- <img src="Client/public/facebook.svg" alt="facebook" width="16" height="16"/> Download **Facebook Live/TV/Reels/Video/Public stories** in different mp4 format 
- <img src="Client/public/instagram.svg" alt="instagram" width="16" height="16"/> Download **Instagram Live/Reels/Video/Public stories** in different mp4 format 
- <img src="Client/public/thread.svg" alt="thread" width="16" height="16"/> Download **Thread media content (any)** in different media format (like mp4, mp3, jpg) 
- <img src="Client/public/spotify.svg" alt="spotify" width="16" height="16"/> Download **Spotify music content** in mp3 format 
- <img src="Client/public/twitter.svg" alt="twitter" width="16" height="16"/> Download **Twitter/X media content (any)** in different media format (like mp4, mp3, jpg) 
- Other features
    - Elegant Dark Mode
    - Fast downloads

    

## Installation
Clone and download this repository
Install my-project with npm Create a .env file, copy the content of exampleENV.txt and fill your envoironment variable Do the exact same thing with Client/.env as well

**NOTE: CLIENT_URL and VITE_SERVER_URL should be on the same PORT**

```bash command (in root)
  npm run build
  npm run start
```
Open the URL to access the website 🎉

    
## Tech Stack

**Client:** ```HTML5, React, Styled Components, react-query, react-hook-form, Axios, react-hot-toast```

**Server:** ```Node.js, Express.js, cors, Axios, Archiver, Stream, ytdl-core```

**API used:** ```ytdl-core API, GoogleAPI YouTube v3, Rapid API```


## Screenshots


**Video Info - Light mode:**

![Video Info - Light mode](https://i.ibb.co/2qFb3BS/1.png)

**Video Download in mp3 - Dark mode:**

![Video Download in mp3 - Dark mode](https://i.ibb.co/m58VQDZ/1-dark-download.png)

**Playlist Information:**

![Playlist Information](https://i.ibb.co/h8g4NfD/2.png)

**Playlist Download in Single click:**

![Playlist Download in Single click](https://i.ibb.co/6Rz8n3W/3-dark.png)

**Error Page:**

![Error Page:](https://i.ibb.co/NCzT9sZ/Untitled.png)



## Authors

- [@noob-nilarghya](https://www.github.com/noob-nilarghya)

