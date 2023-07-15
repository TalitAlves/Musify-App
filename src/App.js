import React, {  useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Header from "./components/core/Header/Header";
import { TokenContext } from "./components/context/tokenContext";
import { RefreshTokenContext } from "./components/context/refreshTokenContext";


function App()  {
  //aqui comienza la llamada a la API
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
 // aqui termina la llamada a la API
 

    const [token, setToken] = useState(window.localStorage.access_token ? window.localStorage.access_token : null)
    const [refresh, setRefresh] = useState(window.localStorage.refresh_token ? window.localStorage.refresh_token : null)
    
    
    return (
      <>
       <RefreshTokenContext.Provider value={{refresh, setRefresh}}>
        <TokenContext.Provider value={{token, setToken}}>
           <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
             
            </Routes>
          </BrowserRouter>
          <button onClick={searcher}>pulsar</button>
     
        </TokenContext.Provider>
        </RefreshTokenContext.Provider>
      </>
    );
  }
  export default App;
