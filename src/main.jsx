import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from "./components/header.jsx"
import Data from "./pages/data.jsx"
import Gallery from "./pages/gallery.jsx"
import Stream from "./pages/stream.jsx"
import {  BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/data" element={<Data />}></Route>
        <Route path="/stream" element={<Stream />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
      </Routes>
    </Router>
)
