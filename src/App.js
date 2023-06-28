import { useState } from 'react';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationalMenu from './Components/NavigationalMenu';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/notes/NoteState';
import SendAlert from './Components/SendAlert';


function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavigationalMenu />
          <SendAlert />
          <div className='container'>
            <Routes>
              <Route exact
                path="/"
                element={
                  <Home />
                }></Route>
              <Route exact
                path="/about"
                element={
                  <About />
                }></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
