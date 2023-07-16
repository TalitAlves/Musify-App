import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Global from "../components/core/Global/global";
import { TokenContext } from "../context/tokenContext";
 

export const ApiContext = createContext();
ApiContext.displayName = "ApiContext"
const CLIENT_ID = Global.client_id
const CLIENT_SECRET = Global.client_secret



export const ApiContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState("https://api.spotify.com/v1/me/");
  const [search, setSearch] = useState("Beyonce");

 
 async function searcher (){
  console.log("buscar" + search);

  let artistParams = {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + window.localStorage.access_token
    }
  } 
  let artistId = await fetch ('https://api.spotify.com/v1/search?q=' + search + '&type=artist' , artistParams  )
  .then(res => res.json())
  .then(data => console.log(data));
 }


  return (
    <ApiContext.Provider value={{ apiResponse }}>{children}</ApiContext.Provider>
  );
};


