import { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {
    const host = `http://localhost:5000`;
    const [notes, setNotes] = useState([]);

    const getNotes = async (token) => {
        try {
            const response = await fetch(`${host}/api/notes/fetchnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            const json = await response.json();
            // console.log(json);
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const addNote = async (title, content, category,token) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ title, content, category })
            });
            const json = await response.json();
            setNotes([...notes, json]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const editNote = async (noteId, title,content,category,token) => {
        try {
            const response = await fetch(`${host}/api/notes/${noteId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ title, content, category })
            });
            const json = await response.json();
            setNotes([...notes, json]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deleteNote = async (noteId,token) => {
        try {
            await fetch(`${host}/api/notes/deletenote/${noteId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            setNotes(notes.filter(note => note._id !== noteId));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
        console.log(noteId);
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesState;
