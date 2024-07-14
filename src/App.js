
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotesState from './context/NotesState';
// import Home from './components/Home';
import CreateUser from './components/CreateUser';
import AddNotes from './components/addNotes';
import Notes from './components/Notes';

function App() {
 
  return (
    <NotesState>
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
      <Route key ="Login" exact path="/" element={<Login/>}/>
      <Route key ="notes" exact path="/notes" element={<Notes/>}/>
      <Route key ="home" exact path="/addNote" element={<AddNotes/>}/>
      <Route key ="createuser" exact path="/createuser" element={<CreateUser/>}/>
      </Routes>
    </div>
  </BrowserRouter>
  </NotesState>
  );
}

export default App;
