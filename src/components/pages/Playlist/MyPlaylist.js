import React, {useState, useContext, useEffect,} from 'react'
import { ApiContext } from '../../../services/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function MyPlaylist() {
    const [playlist, setPlaylist] = useState(null);
    const { access_token } = useContext(ApiContext);
    const { id } = useParams();

    useEffect(() => {
        const getPlaylistById = async () => {
          try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
               
                Authorization: `Bearer ${access_token}`,
                },
              });
            setPlaylist(response.data);
            console.log(response.data)
          } catch (error) {
            console.error("Erro ao obter os dados da playlist:", error);
          }
        };
    
        getPlaylistById(id);
      }, [id, access_token]);
  
      if (playlist) {
        return (
            <>
            <div className='header-playlist'>
           {playlist.images[0] ? <img src={playlist.images[0].url} alt={playlist.name}/> : "not found"} 
            <div className='title-playlist'>
            <p>Playlist</p>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <p>{playlist.owner.display_name}</p>

            </div>

            </div>
          <div>
        
            <p>Name: {playlist.name}</p>
            <p>Description: {playlist.description}</p>
            <p>Owner: {playlist.owner.display_name}</p>
          </div>

          <div className='content-playlist'>
         
          </div>
          </>
        );
      }
    
      return <p>Carregando detalhes da playlist...</p>;
}

export default MyPlaylist

