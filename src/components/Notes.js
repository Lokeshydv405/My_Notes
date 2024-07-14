import React, { useContext,useEffect } from 'react';
import NotesContext from '../context/NotesContext';
import NotesItem from './NotesItem'
export default function Notes() {
    const token = localStorage.getItem('token');
    const context = useContext(NotesContext);
    const {getNotes,notes} = context;
    useEffect(() => {
      getNotes(token)
    })
  return (
    <div className="flex h-screen bg-custom">
            <div className="container mt-5">
                <h1 className="text-center text-[80px] font-serif text-white">Your Notes</h1>
                <div className="row">
                {notes.map((note, index) => (
                    <NotesItem key={index} note={note} />
                ))}
                </div>
            </div>
            </div>
            
    )
}
