
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import PageNotFound from './components/PageNotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './context/DarkModeContext';

import HomePage from './components/HomePage';
import PlaylistLenBody from './components/PlaylistLenBody';
import PlaylistDwnldBody from './components/PlaylistDwnldBody';
import FBvideoDownload from './components/FBvideoDownload';
import InstaVideoDownload from './components/InstaVideoDownload';
import TwitterDownload from './components/TwitterDownload';
import ThreadDownload from './components/ThreadDownload';
import SpotifyDownload from './components/SpotifyDownload';

// creating react-query instance
const queryClient= new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}> {/* react-query provider function (similar to contextAPI) */}
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/features' element={<AppLayout />}>
              <Route index element={<PlaylistLenBody />} />
              <Route path='playlist-len' element={<PlaylistLenBody />} />
              <Route path='playlist-download' element={<PlaylistDwnldBody />} />
              <Route path='fb-video-download' element={<FBvideoDownload />} />
              <Route path='insta-video-download' element={<InstaVideoDownload />} />
              <Route path='x-download' element={<TwitterDownload />} />
              <Route path='thread-download' element={<ThreadDownload />} />
              <Route path='spotify-download' element={<SpotifyDownload />} />
            </Route>
            <Route path="*" element={<PageNotFound message="Page not found :("/>} />
          </Routes>
        </BrowserRouter>

        {/* setting up Toaster (3rd party lib) for displaying nice alert message in notification form */}
        <Toaster 
            position="top-center" 
            gutter={12} 
            containerStyle={{margin: "8px"}}
            toastOptions={{
              success: {
                style: {
                  background: 'var(--color-green-80)'
                },
                duration: 3000,
              },
              error: {
                style: {
                  background: 'var(--color-red-0)'
                },
                duration: 4000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                color: 'var(--color-black-0)'
              }
            }}>
        </Toaster>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
