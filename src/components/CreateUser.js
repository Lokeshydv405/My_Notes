import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
const CreateProfile = () => {
  const host = `http://localhost:5000`;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '',name: '', cpassword: '' });
  const handleOnchange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});

  }
  //create user
  const handleSubmit = async (e)=>{
    console.log(credentials)
    e.preventDefault();
    if(credentials.password !== credentials.cpassword){
      alert('Password does not match');
      return;
    }
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email , password: credentials.password,name: credentials.name})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token', json.authToken);
        navigate("/home");
      }
      else{
        alert('Invalid Credentials');
      }
      
  } catch (error) {
      console.error("Error adding note:", error);
  }
}
  return (
    <div
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20210711/original/pngtree-colorful-doodle-pattern-picture-image_1168028.jpg')",
      }}
      className="flex items-center justify-center h-screen"
    >
      <div className="max-w-[960px] bg-black-dark grid grid-cols-2 items-center p-5 rounded-2xl gap-24">
        <div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/girl-taking-notes-in-online-class-4503139-3733203.png?f=webp"
            alt="Girl taking notes in online class"
          />
        </div>
        <div className="max-w-80 grid gap-5">
          <h1 className="text-5xl font-bold text-white">Create your Profile</h1>
          <p className="text-white">
            Fill all these information properly and then get started with creating notes.
          </p>
          <form action="" className="space-y-6 text-white">
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-user" title="User Icon"></i>
              </div>
              <input
                onChange={handleOnchange}
                type="text"
                placeholder="Name"
                name='name'
                aria-label="Name"
                className="w-80 bg-black px-12 py-2 rounded-full text-white"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-envelope" title="Email Icon"></i>
              </div>
              <input
               onChange={handleOnchange}
                type="email"
                name="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="w-80 bg-black px-12 py-2 rounded-full text-white"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-lock" title="Lock Icon"></i>
              </div>
              <input                
                onChange={handleOnchange}
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                className="w-80 bg-black px-12 py-2 rounded-full text-white"
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-lock" title="Lock Icon"></i>
              </div>
              <input                
                onChange={handleOnchange}
                type="password"
                name="cpassword"
                placeholder=" Password Again"
                aria-label="Password"
                className="w-80 bg-black px-12 py-2 rounded-full text-white"
              />
            </div>
            <button onClick={handleSubmit} type="submit" className="bg-gradient-to-r from-fuchsia-200 to-pink-600 w-80 rounded-full font-semibold py-2">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
