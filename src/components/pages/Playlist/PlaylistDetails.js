import React, { useState, useContext, useEffect } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import "./Playlist.css";
import SearchMusicPlaylist from "./SearchMusicPlaylist";

function PlaylistDetails({ selectedPlaylist }) {
  const [playlist, setPlaylist] = useState(selectedPlaylist);
  const [newSong, setNewSong] = useState("");
  const { access_token } = useContext(ApiContext);
  const id = selectedPlaylist.id;
  console.log(selectedPlaylist)
  console.log( selectedPlaylist.snapshot_id)


  //1. llamada a la api con el id de la playlist recebido pro props
  useEffect(() => {
    const getPlaylistById = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setPlaylist(response.data);
      } catch (error) {
        console.error("Erro ao obter os dados da playlist:", error);
      }
    };

    getPlaylistById(id);
  }, [id, access_token]);

  //2. anadir los tracks ao clicar en +
  const handleSongSelected = async (track) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
    const requestBody = {
      uris: [`${track.uri}`],
      position: 0,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      });

      setNewSong(response.data);
    } catch (error) {
      console.error("Erro to add newSong:", error);
    }
  };

  //3. llamada a api para quitar la cancion
  const removeSelectedSong = async ( track ) => {
    const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
    console.log(selectedPlaylist)
  
    const requestBody = {
      "tracks": [
        {
          "uri": `${track.track.uri}`
        }
      ],
      "snapshot_id":`${selectedPlaylist.snapshot_id}`
     
    };
  
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json" 
        },
        data: requestBody
      });
  
      console.log("Song removed successfully:", response.data);
      console.log(track.uri)
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  //4. funcion para actulizar la playlist despues de quitar la cancion
  const handleRemoveSong = async (track) => {
    await removeSelectedSong(track);
       const updatedPlaylist = { ...playlist };
    updatedPlaylist.tracks.items = updatedPlaylist.tracks.items.filter(
      (item) => item.track.id !== track.track.id
    );
    setPlaylist(updatedPlaylist);
  };



  const handleUpdateSong = (song) => {
    const updatedPlaylist = { ...playlist };
    updatedPlaylist.tracks.items.push({ track: song });
    setPlaylist(updatedPlaylist);
  };

  if (playlist) {
    return (
      <>
        <div className="playlist-details">
          <div className="header-playlist">
            {playlist.images[0] ? (
              <img src={playlist.images[0].url} alt={playlist.name} />
            ) : (
              <span className="material-symbols-outlined">music_note</span>
            )}
            <div className="title-playlist">
              <p>Playlist</p>
              <h1>{playlist.name}</h1>
              <p>{playlist.description}</p>
              <p>{playlist.owner.display_name}</p>
            </div>
          </div>
          <div className="content-playlist">
            <ul className="track-list">
              {playlist.tracks.items
                ? playlist.tracks.items.map((track, index) => {
                    return (
                      <ol key={track.track.id} className="track-item">
                        <span className="index">{index + 1}.</span>

                        {track.track.album ? (
                          <img
                            className="album-image"
                            src={track.track.album.images[0].url}
                            alt="cover album"
                          />
                          
                        ) : (
                          <span className="material-symbols-outlined">
                            music_note
                          </span>
                        )}

                        <div className="track-info">
                          <p className="track-name">{track.track.name}</p>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemoveSong(track)}>Remove</button>
                      </ol>
                    );
                  })
                : null}
            </ul>
            <SearchMusicPlaylist
              handleSongSelected={handleSongSelected}
              handleUpdateSong={handleUpdateSong}
            />
          </div>
        </div>
      </>
    );
  }

  return <p>Carregando detalhes da playlist...</p>;
}

export default PlaylistDetails;
