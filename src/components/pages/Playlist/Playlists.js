import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import PlaylistDetails from "./PlaylistDetails";
import "./Playlist.css";
import PlaylistCreator from "./PlaylistCreator";

function Playlists() {
  const { access_token } = useContext(ApiContext);
  const [playlist, setPlaylist] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //1. llamada a api para recebir las playlist que el usuario tiene
  useEffect(() => {
    const getPlaylist = async () => {
      try {
       await axios
          .get(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            setPlaylist(response.data);
          });
      } catch (error) {
        console.error("Erro ao obter os dados da playlist:", error);
      }
    };

    getPlaylist();
  }, [access_token]);

  //2. funcion para mostrar los detalles de la playlist selecionada/clicada
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  //3.funcion para mostrar el form donde se crea las nuevas playlists
  const showPlaylistCreator = () => {
    setShowForm(!showForm);
  };

  //4. funcion para renderizar el componente cuando se crea un nueva playlist,
  //pasado como pros a PlaylistCreator para guardar la nueva playlist + anadir na nueva
  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylist((prevPlaylist) => {
      const updatedPlaylist = { ...prevPlaylist };
      updatedPlaylist.items.push(newPlaylist);
      return updatedPlaylist;
    });
    setShowForm(false);
  };

  if (playlist) {
    return (
      <>
        <div className="playlist-container">
          <section className="playlist-names">
            <button className="top-buttons">Playlists</button>
            <button onClick={showPlaylistCreator} className="top-buttons">
              +
            </button>
            {playlist?.items?.map((playlist) => {
              return (
                <div
                  key={playlist.id}
                  onClick={() => handlePlaylistClick(playlist)}
                  style={{ cursor: "pointer" }}
                  className="name"
                >
                  <span className="material-symbols-outlined">music_note</span>
                  {playlist.name}
                </div>
              );
            })}
            <section>
              {showForm && (
                <PlaylistCreator onPlaylistCreated={handlePlaylistCreated} />
              )}
            </section>
          </section>
          <section className="playlist-details">
            {selectedPlaylist && (
              <PlaylistDetails selectedPlaylist={selectedPlaylist} />
            )}
          </section>
        </div>
      </>
    );
  } else {
    return "No playlist created";
  }
}

export default Playlists;
