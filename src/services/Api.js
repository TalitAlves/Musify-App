import React, { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext";

export const ApiContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [search, setSearch] = useState("house");
  const [type, setType] = useState("artist");
  const [artistId, setArtistId] = useState(""); 
  const [artistAlbums, setArtistAlbums] = useState([]);


  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=${type}`;
  const profile_URL = `https://api.spotify.com/v1/me`;
  const ArtistsIdUrl = `https://api.spotify.com/v1/artists/`;
  const albums_URL = `https://api.spotify.com/v1/artists/${artistId}/albums`;


  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    setEndpoint(search_URL);
  }, [search_URL]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let authParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.access_token,
          },
        };

        const response = await fetch(endpoint, authParams);
        const data = await response.json();

        setApiResponse(data);
        console.log("Datos guardados en apiResponse:", data);

        if (data && data.artists && data.artists.items.length > 0) {
          const artistId = data.artists.items[0].id; 
          setArtistId(artistId);
        }
      } catch (error) {
        console.log("La llamada a la API no funciona", error);
      }
    };

    fetchData();
  }, [endpoint, ArtistsIdUrl]);

useEffect(() => {
  const fetchArtistDetails = async () => {
    try {
      if (artistId) {
        let authParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.access_token,
          },
        };

        const response = await fetch(`${ArtistsIdUrl}/${artistId}`, authParams);
        const data = await response.json();

        console.log("Detalles del artista seleccionado:", data);

        const albumsResponse = await fetch(`${albums_URL}`, authParams);
        const albumsData = await albumsResponse.json();

        setArtistAlbums(albumsData.items);
        console.log("Álbumes del artista:", albumsData.items);
      }
    } catch (error) {
      console.log("Error al obtener detalles del artista:", error);
    }
  };

  fetchArtistDetails();
}, [artistId, ArtistsIdUrl]);

  return (
    <ApiContext.Provider
      value={{ apiResponse, search, setSearch, type, setType, endpoint, setEndpoint, search_URL, profile_URL, artistId, setArtistId, artistAlbums}}
    >
      {children}
    </ApiContext.Provider>
  );
};
 
