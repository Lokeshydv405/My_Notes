import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const host = `http://localhost:5000`;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword,setShowPassword] = useState(false);
  const handleshowpassword = () => {
    setShowPassword(!showPassword);
  }
  const handleOnchange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
//checking the credits 
  const handleSubmit = async (e)=>{

    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credentials.email , password: credentials.password})
      });
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.authToken);
        navigate("/notes");
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
      style={{ backgroundImage: "url('https://png.pngtree.com/background/20210711/original/pngtree-colorful-doodle-pattern-picture-image_1168028.jpg')" }}
      className="flex items-center justify-center h-screen bg-cover bg-center"
    >
      <div className="max-w-[960px] bg-black-dark grid grid-cols-2 items-center p-4 rounded-2xl gap-24">
        <div>
          <img
          className='rounded-2xl'
            src="https://i.pinimg.com/736x/96/ab/c8/96abc8114ad4b4b64558bcbdbe34a5c1.jpg"
            alt="Login Illustration"
          />
        </div>
        <div className="max-w-80 grid gap-5">
          <h1 className="text-6xl font-bold text-white text-center">LOGIN !!</h1>
          <p className="text-white">
            Login and then dive deep into this amazing notes app to keep yourself up-to-date with your work.
          </p>
          <form className="space-y-6 text-white" >
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-envelope-open"></i>
              </div>
              <input
              name="email"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="w-80 bg-black px-12 py-2 rounded-full"
                onChange={handleOnchange}
              />
            </div>
            <div className="relative">
              <div className="absolute top-1 left-1 bg-black rounded-full p-2 flex items-center justify-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
              name="password"
              type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-label="Password"
                className="w-80 bg-black px-12 py-2 rounded-full"
                onChange={handleOnchange}
              />
            </div>
            <button onClick={handleshowpassword} type="button">
        {showPassword ? "Hide Password" : "Show Password"}
      </button>
            <button  onClick={handleSubmit} type="submit" className="bg-gradient-to-r from-fuchsia-200 to-pink-600 w-80 rounded-full font-semibold py-2" >
              Sign In
            </button>
          </form>
          <div className="text-white border-t border-white pt-4 space-y-4 text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/createuser" className="text-blue-400 font-semibold hover:cursor-pointer px-2">
                Sign up
              </Link>
            </p>
            <p>
              Forgot password?{' '}
              <Link to="/reset-password" className="text-blue-400 font-semibold hover:cursor-pointer px-2">
                Reset password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
