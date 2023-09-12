import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/action/auth';
import { useDispatch } from 'react-redux';





const Login = () =>{
  const dispatch = useDispatch();

    useEffect(()=>{
        const auth = localStorage.getItem("userdata");
        if(auth)
        {
            navigate('/')
        }

    },[])
    const navigate = useNavigate()
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
      dispatch(login(email, password));
      navigate("/");
        // let response = await fetch("http://localhost:5000/login", {
        //   method: "POST",
        //   body: JSON.stringify({ email, password }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // response = await response.json();
        // if(response.auth)
        // {
        // localStorage.setItem("userdata", JSON.stringify(response.user));
        // localStorage.setItem("auth", JSON.stringify(response.auth));
        // navigate("/");
        // }else{
        //     alert('no user found')
        // }
        
      };
    return(
        <div className='login'>
       <input type="text" className="inputBox"placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
       <input type="text" className="inputBox"placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)} />
       <button onClick={handleLogin} className='appButton'>Login</button>

        </div>
    )
}

export default Login