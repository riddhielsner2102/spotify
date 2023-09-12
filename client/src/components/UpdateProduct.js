import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";

const UpdateProduct = () =>{
    const navigate= useNavigate()

    const params = useParams()
    const [name, SetName] = useState('');
    const [price, SetPrice] = useState('');
    const [category, SetCategory] = useState('');
    const [company, SetCompany] = useState('');
    const [error, SetError] = useState(false)

const getProductDetails = async() =>{
    try {
        const response = await fetch(`http://localhost:5000/product/${params.id}`, {
          method: "GET",
          headers: {
            "authorization" : JSON.parse(localStorage.getItem('auth'))
           },
        });
        const data = await response.json();
        if(data)
        {
            SetName(data.name);
            SetPrice(data.price);
            SetCompany(data.company);
            SetCategory(data.category);

    }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

}

useEffect(()=>{
    getProductDetails()
},[])

    const handleSubmit = async() =>{
       
        let response = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                "authorization" : JSON.parse(localStorage.getItem('auth'))
              },
          });
          response = await response.json();
          if(response)
          {
          navigate("/");
          }else{
              alert('no user found')
          }
            
    }
    return(
        <div className="product">
            <h5>Update product</h5>
            <input type="text" className="inputBox" placeholder="enter product name" value={name} onChange={(e)=>SetName(e.target.value)}/>
            {error && !name ? <span className="errorMessage">Enter valid name</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product price" value={price} onChange={(e)=>SetPrice(e.target.value)}/>
            {error && !price ? <span className="errorMessage">Enter valid price</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product category" value={category} onChange={(e)=>SetCategory(e.target.value)}/>
            {error  && !category ? <span className="errorMessage">Enter valid category</span> : ""}
            <input type="text" className="inputBox"  placeholder="enter product company" value={company} onChange={(e)=>SetCompany(e.target.value)}/>
            {error && !company ? <span className="errorMessage">Enter valid company</span> : ""}
            <button onClick={handleSubmit}>Upload Product</button>



        </div>
    )

}
export default UpdateProduct