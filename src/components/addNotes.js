import React, { useContext, useState,useEffect } from 'react';
import NotesContext from '../context/NotesContext';
const AddNotes = () => {
    const token = localStorage.getItem('token');
    const context = useContext(NotesContext);
    const { notes,addNote } = context;
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { title, content, category } = formData;

        if (!title || !content || !category) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true);
        try {
            await addNote(title, content, category,token);
            setSuccess('Note added successfully');
            setFormData({ title: '', content: '', category: 'General' });
        } catch (err) {
            setError('Failed to add note');
        } finally {
            setIsSubmitting(false);
        }
    };
    useEffect(() => {
        if (error !== '') {
            const timer = setTimeout(() => {
                setError('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    useEffect(() => {
        if (success !== '') {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    
    return (
        <>
              <div  className="bg-custom flex items-center justify-center min-h-screen ">
            
            <div className="max-w-[960px] bg-black-dark grid grid-cols-2 items-center p-4 rounded-2xl gap-24 min-h-[500px]   px-4">
              <div className="grid gap-3 max-w-96">
              
                <h1 className="font-semibold text-4xl text-white m-0 text-center font-serif text-black">CREATE A NEW NOTE:</h1>
                <form action="" className="space-y-6 text-white">
                    
                  <div className="flex justify-around gap-5">
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        placeholder='Note Title'
                        value={formData.title}
                        onChange={handleChange}
                        className="min-w-[700px] h-11 font-serif bg-black text-white px-12 py-2 rounded-2xl "/>
                         <div className="mb-3">
                            {/* <label htmlFor="ca</div>tegory" className="form-label">Category:</label> */}
                            <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">General</option>
                                    <option value="Study">Study</option>
                                    <option value="Perosnal">Perosnal</option>
                                    <option value="Work">Work</option>
                                    {/* Add more options as needed */}
                                </select>
                        </div>
                  </div>
                  
                  <div> 
                    <textarea id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                 placeholder="Write Your Notes..." 
                                 className="min-w-[850px] text-xl text-fuchsia-900 min-h-60 rounded-2xl px-3  font-serif"></textarea>
                  </div>
                    <div className="flex justify-between"> 
                      <button  onClick={handleSubmit} className="bg-black text-purple-100 rounded-lg border-white w-24 h-12 font-semibold" >Save</button>
                      <button className="bg-black text-purple-100 rounded-lg border-white w-24 h-12 font-semibold">Delete</button>
                    </div>
                    <div className="alert-space">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>
                </form>
                {/* <!-- <div>
                  <button  className="bg-pink-700 text-pink-100 rounded-lg border-white w-24 h-12 font-semibold">Text color</button>
                    <button  className="bg-pink-700 text-pink-100 rounded-lg border-white w-44 h-12 font-semibold">Background color</button>
                  </div> --> */}
              </div>
            </div>
        
        
        </div>
        </>
    );
};

export default AddNotes;
