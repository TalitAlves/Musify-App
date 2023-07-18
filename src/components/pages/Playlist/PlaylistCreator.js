import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../../services/Api";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaylistCreator() {
  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState([]);
  const [createdPlaylist, setCreatedPlaylist] = useState(null);
  const { apiResponse, setEndpoint, profile_URL, access_token } =
    useContext(ApiContext);

  useEffect(() => {
    setEndpoint(profile_URL); //se puede atualizar que endpoint llamar
  }, [profile_URL]);

  useEffect(() => {
    const storedLinks = localStorage.getItem("playlistLinks");
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlistLinks", JSON.stringify(links));
  }, [links]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addPlayList = (event) => {
    event.preventDefault();
    const playlistName = inputValue;

    setLinks((prevLinks) => [
      ...prevLinks,
      {
        name: playlistName,
        link: playlistName.toLocaleLowerCase().replace(`//g, '_'`),
      },
    ]);
    setInputValue("");
  };

  const user_id = apiResponse.id;

  const createPlaylist = async () => {
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    const requestBody = {
      "name": inputValue,
      "description": "New playlist description",
      "public": false
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
        
      });
      setCreatedPlaylist(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao criar a playlist:", error);
    }
  };

  return (
    <>
      <form onSubmit={addPlayList}>
        <div className="title">New Playlist</div>
        <input
          type="text"
          placeholder="Playlist name"
          required
          onChange={handleInputChange}
        />
        <button type="submit" onClick={createPlaylist}>
          Creat
        </button>
      </form>

      {links.map((link, index) => (
        <div key={index}>
        
        </div>
      ))}

      {createdPlaylist && (
        <div>
          <h2>Playlist created!</h2>
          <p>Name: {createdPlaylist.name}</p>
          <p>Description: {createdPlaylist.description}</p>
        </div>
      )}
    </>
  );
}

export default PlaylistCreator;
