import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "../css/cart.css"

 const  SecondCart = () => {

  const [data,setData] = useState([])

  
  const handleCheckout = async() => {
    let userEmail = localStorage.getItem("useremail");
     await fetch("http://localhost:5000/api/checkOutCart",{
      method : "POST",
      headers : {
        "Content-Type"  : "application/json",
      },
      body : JSON.stringify({email : userEmail})
    })
    setData(null)
// getCartData()
     


  }
  
 
  useEffect(() => {
    const getCartData  = async() => {
      const userEmail  = localStorage.getItem("userEmail")
     const response = await fetch("http://localhost:5000/api/getCartData",{ 
  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email : userEmail})
      })
      // alert(userEmail)
      let result = await response.json();
      setData(result.cart)
      console.log(result)
      
    }
    getCartData();
    console.log(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // console.log(data.length ? 0)
  // let totalprise =400
  let totalprise = data.reduce((total,food)=> total + food.price,0) 
  return (
  
    <>
    <Navbar/>

    { data.length > 0  ? <div className='main container mt-4' > <table className="table rounded  table-light border  mt-5 table-hover">
  <thead>
    <tr className='table-warning'>
    <th scope='col' >no</th>
             <th scope='col' >name</th>
            <th scope='col' >qty</th>
             <th scope='col' >amt</th>
          <th scope='col' >option</th>
          <th scope='col' >Remove</th>
    </tr>
  </thead>
  <tbody>
        {
          data.map((food,index)=>{
            return(
              <tr className='table-warning'>
              <th scope='row'>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td><button type='button' className='btn delet_btn '> x </button></td>
          </tr>
            )
          })
        }

      
           </tbody>


</table> 
<div><h1 className='fs-2 text-dark'>Total Price  : {totalprise}</h1></div>
 <button onClick={handleCheckout} className='btn btn-success mt-5'>Check Out</button>

</div> : <h1 className='text-dark'>no data to show</h1>}
    
   

        
        </>
  )
}


export default SecondCart