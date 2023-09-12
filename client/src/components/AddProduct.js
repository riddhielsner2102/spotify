import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>{
    const navigate = useNavigate()
    const [name, SetName] = useState('');
    const [price, SetPrice] = useState('');
    const [category, SetCategory] = useState('');
    const [company, SetCompany] = useState('');
    const [error, SetError] = useState(false)

    const handleSubmit = async() =>{
        if(!name || !price || !company || !category)
        {
            SetError(true);
            return false
        }
let userId = JSON.parse(localStorage.getItem('userdata'))?._id;
        let response = await fetch("http://localhost:5000/addproduct", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company , userId}),
            headers: {
              "Content-Type": "application/json",
              "authorization" : JSON.parse(localStorage.getItem('auth'))
            },
          });
          response = await response.json();
          if(response)
          {
        //   localStorage.setItem("userdata", JSON.stringify(response));
          navigate("/");
          }else{
              alert('no user found')
          }
            
    }
    return(
        <div className="product">
            <h5>Add product</h5>
            <input type="text" className="inputBox" placeholder="enter product name" value={name} onChange={(e)=>SetName(e.target.value)}/>
            {error && !name ? <span className="errorMessage">Enter valid name</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product price" value={price} onChange={(e)=>SetPrice(e.target.value)}/>
            {error && !price ? <span className="errorMessage">Enter valid price</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product category" value={category} onChange={(e)=>SetCategory(e.target.value)}/>
            {error  && !category ? <span className="errorMessage">Enter valid category</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product company" value={company} onChange={(e)=>SetCompany(e.target.value)}/>
            {error && !company ? <span className="errorMessage">Enter valid company</span> : ""}
            <button onClick={handleSubmit}>Add Product</button>



        </div>
    )

}
export default AddProduct