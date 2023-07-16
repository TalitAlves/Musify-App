import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Header from "./components/core/Header/Header";
import { TokenContext } from "./context/tokenContext";
import { RefreshTokenContext } from "./context/refreshTokenContext";
import List from "./components/pages/List/List";

function App() {
  // Aquí comienza la llamada a la API
  const [ search, setSearch ] = useState("Beyonce");
 

  async function searcher() {
    console.log("buscar " + search);

    let artistParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.access_token
      }
    };
    try { // he añadido un try catch para que capture posibles errores en la llamada a la API
      await fetch('https://api.spotify.com/v1/search?q=' + search + '&type=artist', artistParams)
        .then(res => res.json())
        .then(data => {
          setSearch(data);
          //Prueba para guardar los datos en la variable de estado Search
          console.log("datos guardados en search", data);
        });
    } catch (error) {
      console.log("La llamada a la API no funciona", error);
    
    }
  }
  
  // Aquí termina la llamada a la API

  const [ token, setToken ] = useState(window.localStorage.access_token ? window.localStorage.access_token : null);
  const [ refresh, setRefresh ] = useState(window.localStorage.refresh_token ? window.localStorage.refresh_token : null);

  return (
    <>
      <RefreshTokenContext.Provider value={{ refresh, setRefresh }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home artists={search} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/list" element={<List />} />

              
            </Routes>
          </BrowserRouter>
          <button onClick={searcher}>pulsar</button>
        </TokenContext.Provider>
      </RefreshTokenContext.Provider>
    </>
  );
}

export default App;