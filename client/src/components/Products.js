import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Products = () => {
  const [products, setProduct] = useState([]);

  const productListing = async () => {
    try {
      const response = await fetch("http://localhost:5000/productlist", {
        method: "GET",
        headers: {
          "authorization" : JSON.parse(localStorage.getItem('auth'))
        },
      });
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    productListing();
  }, []);
const handleDelete = async(item) =>
{
    try {
        const response = await fetch(`http://localhost:5000/product/${item}`, {
          method: "DELETE",
          headers: {
            "authorization" : JSON.parse(localStorage.getItem('auth'))
           },
        });
        const data = await response.json();
        if(data)
        {
            productListing()
        }
        // setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}
const searchHandle = async(e) =>{
    let searchdata = e.target.value
    if(searchdata)
    {
      try {
        const response = await fetch(`http://localhost:5000/searchdata/${searchdata}`, {
          method: "GET",
          headers: {
           "authorization" : JSON.parse(localStorage.getItem('auth'))
          },
        });
        const data = await response.json();
        setProduct(data);
        // setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    }
    else{
      productListing()
    }
  
}

  return (
    <div className='product-list'>
      <h1>Products Here</h1>
      <input type='text' placeholder='enter your search item' className='searchproductbox' onChange={searchHandle}/>
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Actions</li>
      </ul>
   { products?.length > 0 ?  products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li><button onClick={()=>handleDelete(item?._id)}>Delete</button>
              <Link to={"/update/"+item?._id}><button>Update</button></Link></li>
  
          </ul>
        )): <h1>No Data Found</h1>}

      
      
      
    </div>
  );
};

export default Products;
