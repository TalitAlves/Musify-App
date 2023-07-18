import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../../services/Api";
import axios from "axios";
import MyPlaylist from "./MyPlaylist";
import { Link } from "react-router-dom";
import "./Playlist.css";

function GetPlaylist() {
  const { access_token } = useContext(ApiContext);
  const [data, setData] = useState({});

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const response = await axios
          .get(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            setData(response.data);
          });
      } catch (error) {
        console.error("Erro ao obter os dados da playlist:", error);
      }
    };

    getPlaylist();
  }, [access_token]);

  if (data) {
    return (
      <>
        <h1>My Playlist</h1>
        <section>
          {data?.items?.map((playlist) => {
            return (
             
                <Link
                  key={playlist.id}
                  to={`/getplaylist/${playlist.id}`}
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  {playlist.name}
                </Link>

            );
          })}
        </section>

        {selectedPlaylist && <MyPlaylist id={selectedPlaylist.id} />}
      </>
    );
  } else {
    return "No playlist created";
  }
}

export default GetPlaylist;
