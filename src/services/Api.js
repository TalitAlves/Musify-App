import React, { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext";

export const ApiContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [search, setSearch] = useState("the beatles");
  const [type, setType] = useState("artist");
 


  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=${type}`;
  const profile_URL = `https://api.spotify.com/v1/me`;
 
  const access_token = window.localStorage.access_token


  const [endpoint, setEndpoint] = useState("");

  useEffect(() => {
    setEndpoint(search_URL);
  }, [search_URL]);

  useEffect(() => {
    const fetchTrackData = async () => {
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

        if (data && data.artists && data.artists.items.length > 0) {
          const artistId = data.artists.items[0].id; 
          setArtistId(artistId);
        }
      } catch (error) {
        console.log("La llamada a la API no funciona", error);
      }
    };

    fetchTrackData();
  }, [ endpoint ]);


  // petición API para obtener canciones para la Home
  const [ trackApiResponse, setTrackApiResponse ] = useState([]);

  const track_URL = "https://api.spotify.com/v1/search?q=album&type=track&limit=20"; // URL con q= album | type=track | limit=20 tracks

  const [ trackEndpoint, setTrackEndpoint ] = useState("");

  useEffect(() => {
    setTrackEndpoint(track_URL);
  }, [ track_URL ]);

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

        const res = await fetch(trackEndpoint, authParams);
        const data = await res.json();

        setTrackApiResponse(data);
      } catch (error) {
        console.log("intento de API call fallido",error);
      }
    }

    fetchData();
  }, [ trackEndpoint ]);

// petición API para obtener canciones para la details
const [artistId, setArtistId] = useState(""); 
const [artistAlbums, setArtistAlbums] = useState([]);
const ArtistsIdUrl = `https://api.spotify.com/v1/artists`;

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

 

       
      }
    } catch (error) {
      console.log("Error al obtener detalles del artista:", error);
    }
  };

  fetchArtistDetails();
}, [artistId, ArtistsIdUrl]);

useEffect(() => {
  const fetchAlbums = async () => {
    try {
      if (artistId) { 
        let authParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.access_token,
          },
        };

        const albumsResponse = await fetch(`${ArtistsIdUrl}/${artistId}/albums?market=ES&limit=50`, authParams);
        const albumsData = await albumsResponse.json();

        setArtistAlbums(albumsData.items);
        console.log("Álbumes del artista:", albumsData.items);
      }
    } catch (error) {
      console.log("Error al obtener los álbumes del artista:", error);
    }
  };

  fetchAlbums();
}, [artistId, ArtistsIdUrl]);

  // petición API para obtener los top tracks del artista
  const [topTracks, setTopTracks] = useState([]);



  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        if (artistId) {
          let authParams = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.access_token,
            },
          };
  
          const trackResponse = await fetch(`${ArtistsIdUrl}/${artistId}/top-tracks?market=ES`, authParams);
          const tracksData = await trackResponse.json();
  
          if (tracksData && tracksData.tracks && tracksData.tracks.length > 0) {
            setTopTracks(tracksData.tracks);
            console.log("Top tracks del artista:", tracksData.tracks);
          } 
        }
      } catch (error) {
        console.log("Error al obtener los top tracks del artista:", error);
      }
    };
  
    fetchTopTracks();
  }, [artistId, ArtistsIdUrl]);

  // petición Api para obtener las recomendaciones de varias canciones
  const [recApiResponse, setRecApiResponse] = useState([]);
  const rec_URL = "https://api.spotify.com/v1/recommendations?limit=20&seed_genres=rock%2Cindie%2Calternative%2Cpop%2Cfolk";
  const [recEndpoint, setRecEndpoint] = useState("");

  useEffect(() => {
    setRecEndpoint(rec_URL);
  }, [rec_URL])

  useEffect(() => {
    const fetchRecData = async () => {
      try {
        let authParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.access_token,
          },
        };

        const response = await fetch(recEndpoint, authParams);
        const data = await response.json();

        setRecApiResponse(data);
        console.log("recommendations API response", data);
      } catch (error) {
        console.log("ERROR en API RESPONSE", error);
      }
    }
    fetchRecData();
  }, [recEndpoint]);


  return (
    <ApiContext.Provider
      value={{
        apiResponse,
        search,
        setSearch,
        type,
        setType,
        endpoint,
        setEndpoint,
        search_URL,
        profile_URL,
        track_URL,
        trackApiResponse,
        trackEndpoint,
        setTrackEndpoint,
        access_token,
        artistId, 
        setArtistId, 
        artistAlbums,
        setArtistAlbums,
        topTracks,
        setTopTracks,
        recApiResponse,
        recEndpoint,
        setRecEndpoint,
        rec_URL,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
 
