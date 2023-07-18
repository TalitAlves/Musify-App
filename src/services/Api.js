import React, { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext"


export const ApiContextProvider = ({ children }) => {

  const [ apiResponse, setApiResponse ] = useState([]);
  const [ search, setSearch ] = useState("house");
  const [ type, setType ] = useState("artist") //se puede cambiar el type y buscar por album", "artist", "playlist", "track", "show", "episode", "audiobook"

  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=${type}`
  const profile_URL = `https://api.spotify.com/v1/me`

  const [ endpoint, setEndpoint ] = useState("")

  useEffect(() => {
    setEndpoint(search_URL); //se puede atualizar que endpoint llamar
  }, [ search_URL ]);


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
        console.log("Datos guardados en apiResponse:", data);
      } catch (error) {
        console.log("La llamada a la API no funciona", error);
      }
    }

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
        console.log("Respuesta de la API para los tracks", data);
      } catch (error) {
        console.log("intento de API call fallido")
      }
    }

    fetchData();
  }, [ trackEndpoint ]);


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
        setTrackEndpoint
      }}>
      {children}
    </ApiContext.Provider>
  );
};