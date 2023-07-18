import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../../../services/Api";
import Searcher from "../Searcher/Searcher";
import './Artists.css'

const Artists = () => {
  const { apiResponse, search } = useContext(ApiContext);
  // Prueba para filtrar los artistas
  const filteredArtists = apiResponse?.artists?.items?.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="artists">
      <h1>Lista de artistas</h1>
      {/* Renderiza el componente Searcher para manejar la búsqueda */}
      <Searcher />
      <div className="artists-div">
        {filteredArtists?.map((artist) => (
          // Enlace para redirigir al usuario a la página de detalles al hacer clic en cualquier parte del artista
          <Link to={`/artists/${artist.id}`} key={artist.id} className="artist-card-link">
            <div className="artist-card">
              <h2>{artist.name}</h2>
              {artist.images && artist.images.length > 0 && (
                <img src={artist.images[0].url} alt={artist.name} className="artist-img" />
              )}
              {artist.genres && <p>{artist.genres.join(", ")}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
