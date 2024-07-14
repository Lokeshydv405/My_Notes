import React, { useContext,useEffect } from 'react';
import NotesContext from '../context/NotesContext';
import NotesItem from "./NotesItem"
const Home = () => {
    const { notes,getNotes } = useContext(NotesContext);
    useEffect(() => {
      getNotes()
    })
    return (
        <div className="container mt-5">
            <h2 className="text-center">Your Notes</h2>
            <div className="row">
                {notes.map((note) => (
                    <NotesItem key={note.title} note = {note}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
