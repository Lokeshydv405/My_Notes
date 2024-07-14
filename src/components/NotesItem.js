import React, { useContext } from 'react';
import NotesContext from '../context/NotesContext';

const Card = ({ note }) => {
  const context = useContext(NotesContext);
  const { deleteNote } = context;

  const handleDel = () => {
    deleteNote(note._id, localStorage.getItem('token'));
  };

  return (
    <div className="my-4 mx-auto p-6 border rounded-lg shadow-lg bg-white max-w-xl hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-xl font-bold mb-2 text-gray-800">{note.title}</h1>
      <h3 className="text-sm text-gray-500 mb-4">{new Date(note.createdAt).toLocaleDateString()}</h3>
      <p className="text-gray-700 mb-4">{note.content}</p>
      <p className="text-sm text-blue-600 mb-4">{note.category}</p>
      <button
        onClick={handleDel}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
