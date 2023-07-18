import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import Searcher from "../Searcher/Searcher";

function Playlist() {
  const { id } = useParams();

  
  const { apiResponse, setEndpoint, search, } = useContext(ApiContext);
  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=track`;

  useEffect(() => {
    
    setEndpoint(search_URL);
  }, [search_URL]);
  

  console.log(apiResponse);

  const filteredSong = apiResponse?.tracks?.items?.filter((track) =>
    track.name.toLowerCase().includes(search.toLowerCase())
  );

  if (apiResponse && apiResponse.tracks && apiResponse.tracks.items) {
    return (
      <>
        <h1>List Song</h1>
        <Searcher type={"track"}/>
        <ul>
          {filteredSong?.map((song) => {
            return <li key={song.id}>{song.name}</li>;
          })}
        </ul>
      </>
    );
  } return null
} 

export default Playlist;
