import React, { createContext, useEffect, useState } from "react";

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext"


export const ApiContextProvider = ({ children }) => {
  
  const [apiResponse, setApiResponse] = useState([]);
  const [search, setSearch] = useState("house"); 
  const [type, setType] = useState("artist") //se puede cambiar el type y buscar por album", "artist", "playlist", "track", "show", "episode", "audiobook"
 
  const search_URL = `https://api.spotify.com/v1/search?q=${search}&type=${type}`
  const profile_URL = `https://api.spotify.com/v1/me`
  const access_token = window.localStorage.access_token
  

  const [endpoint, setEndpoint] = useState("")
 
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
      } catch (error) {
        console.log("La llamada a la API no funciona", error);
      }
    }

    fetchData();
  }, [endpoint]);
 


  return (
    <ApiContext.Provider value={{ apiResponse, search, setSearch, type, setType, endpoint, setEndpoint,search_URL, profile_URL, access_token }}>
    {children}
    </ApiContext.Provider>
  );
};