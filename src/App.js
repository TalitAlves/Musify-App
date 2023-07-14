import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home/Home'




export default class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routes>

            <Route path='/*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    )
  }
}