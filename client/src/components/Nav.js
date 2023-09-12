import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  Logo from "../assests/download.jpeg";
const Nav = () =>{
    const navigate = useNavigate();
        const auth = localStorage.getItem("userdata");
      const logout = () =>{
        localStorage.clear('');
        navigate('/signup')
      }
       
    return(
       <div>
        <ul className='nav-ul'>
            {auth ? 
            <>
            <img src={Logo} alt="logo" className='logo'/>
             <li><Link to="/">Products</Link></li>
            <li><Link to="/albumListing">Albums</Link></li>
            <li><Link to="/createalbum">Create Album</Link></li>
            <li><Link to="/addproduct">Add Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/signup" onClick={logout}>Logout({JSON.parse(auth).name}) </Link></li>
            </>
              :  
              <>
              <li><Link to="/login" >Login</Link></li> 
                <li><Link to="/signup">SignUp</Link></li>
              </>
                }
          
           

        </ul>
       </div>
    )

}
export default Nav;