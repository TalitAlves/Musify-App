import React, {  useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Header from "./components/core/Header/Header";
import { TokenContext } from "./components/context/tokenContext";
import { RefreshTokenContext } from "./components/context/refreshTokenContext";


function App()  {
  

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
     
        </TokenContext.Provider>
        </RefreshTokenContext.Provider>
      </>
    );
  }
  export default App;
