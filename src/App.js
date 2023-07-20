import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Header from "./components/core/Header/Header";
import { TokenContext } from "./context/tokenContext";
import { RefreshTokenContext } from "./context/refreshTokenContext";
import List from "./components/pages/List/List";
import Artists from "./components/pages/Artists/Artists";
import Footer from "./components/core/Footer/Footer";
import Details from "./components/pages/ArtistDetails/Details";
import TrackDetail from "./components/pages/TrackDetail/TrackDetail";
import SavedTracks from "./components/pages/SavedTracks/SavedTracks";
import Playlists from "./components/pages/Playlist/Playlists";

function App() {

  const [ token, setToken ] = useState(window.localStorage.access_token ? window.localStorage.access_token : null);
  const [ refresh, setRefresh ] = useState(window.localStorage.refresh_token ? window.localStorage.refresh_token : null);


  return (
    <>
      <RefreshTokenContext.Provider value={{ refresh, setRefresh }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/track/:trackId" element={<TrackDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/list" element={<List />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/artists/:id" element={<Details />} />
              <Route path="/savedtracks" element={<SavedTracks />} />


            </Routes>
            <Footer />
          </BrowserRouter>
        </TokenContext.Provider>
      </RefreshTokenContext.Provider>
    </>
  );
}

export default App;