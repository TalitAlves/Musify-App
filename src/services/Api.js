import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Global from "../components/core/Global/global";
 

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext"
const CLIENT_ID = Global.client_id
const CLIENT_SECRET = Global.client_secret



export const ApiContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState("https://api.spotify.com/v1/me/");
  const [search, setSearch] = useState("Beyonce");


  
  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    axios.post("https://accounts.spotify.com/api/token", null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: authParameters,
    })
    .then((response) => {
      const data = response.data;
      setAccessToken(data.access_token);
    })
    .catch((error) => {
      console.error("Failed to obtain access token:", error);
    });
}, []);

useEffect(()=>{
  console.log(search);
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  axios.get("https://api.spotify.com/v1/search?q" + search + params)
    .then((response) => {
      const data = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.error("Failed to search:", error);
    });

},[accessToken, search])

  



  return (
    <ApiContext.Provider value={{ apiResponse }}>{children}</ApiContext.Provider>
  );
};


