import React, { useContext } from 'react';
import { useLocation, Link,useNavigate } from 'react-router-dom';
import NotesContext from '../context/NotesContext';
// import useHistory from 'use-history';

export default function Navbar() {
  const a = useContext(NotesContext);
  const navigate = useNavigate();
  let location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isCreateUserPage = location.pathname === '/createuser';
  const handleLogout = () => {

    // Here's a simple example:
    localStorage.removeItem('token');
    navigate('/');  
  };
    // Add your logout logic here

  // Render the navbar only if not on login or create user page
  if (isLoginPage || isCreateUserPage) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-slate-900 lack p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link className="font-semibold text-xl tracking-tight" to="#">My Notes</Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/addNote">Add Notes</Link>
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" to="/notes">All Notes</Link>
        </div>
        <div>
          <form className="flex">
            <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="search" placeholder="Search" aria-label="Search" />
            <button className="flex-shrink-0 bg-white hover:bg-gray-700 text-sm border-4 text-black py-1 px-2 rounded" type="submit">Search</button>
            <button className="flex-shrink-0 bg-white hover:bg-gray-700 text-sm border-4 text-black py-1 px-2 mx-2 rounded" onClick={handleLogout}>Log Out</button>
          </form>
        </div>
      </div>
    </nav>
  );
}