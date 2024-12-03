/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const AdminCard = ({ _id, email,img, name, options, }) => {

  let removeItemCount = 0

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size]);


  // const handleEdit =async () =>{
  
  //  let tkn = localStorage.getItem("token")
  //  if(!tkn) {
  //   return alert("please login first")
  //  }
  //   let userEmail = localStorage.getItem("userEmail");
    
 
  //    await fetch("http://localhost:5000/api/addToCart", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: userEmail,
  //       cartData: {name, price: finalPrice, qty, size }
  //     }),
  //   });
  //   // alert(email)
  //   // console.log(name,finalPrice,qty,size )
  // }


  useEffect(() => {
    


  }, [removeItemCount])
  
  
  const handleDelete = async (nameofItem) => {
    
      try {

        const userConfirmed = confirm("Are you sure you want to delete this resource?");
        
       if(userConfirmed){
        const response = await axios.delete(`http://localhost:5000/api/admin/deletItem/${nameofItem}`)      
        const json = response.data;
        console.log("json=>",json.msg,json.success)

        if(!json.success){
          alert(json.msg)
          window.location.reload();
          return;
        }

        if(json.success){
          alert(json.msg)
          window.location.reload();          
        } 
      }
      else{
        return
      }
      } catch (error) {
        console.error('Error occurred:', error);  // Handle error
      }
  
 
     
  }



  if (options !== null) {
    var optionPrice = Object.keys(options);
  } else {
    optionPrice = [];
  }

  return (
    <div
      className="card border "
      style={{ width: "18rem" , borderRadius : "5px"}}
    >
      <img src={img} style={{height:"26vh" ,borderRadius : "5px"}} className="card-img-top" alt="..." />
      <div className="card-body">

         <h5 className="card-title text-dark">  {name} ${finalPrice}  </h5>

        <div className="dbtn  mt-2 d-flex justify-content-between ">
          <label htmlFor="price " className="text-dark text-capitalize fw-bold">
            qty
          </label>

          <select   name="price"  className="py-1 px-3  btn btn-light btn-sm"  onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i} value={i + 1}>
                  {" "}
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>


        <div className="dbtn mt-2 d-flex justify-content-between  ">
          <label htmlFor="qty " className="text-dark text-capitalize fw-bold">
            size
          </label>
          <select name="quentity" className="py-1 px-3  btn btn-light btn-sm  " id="" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
           
            {optionPrice.map((data) => {
              return <option>{data}</option>;
            })}
          </select>
        </div>

        <hr></hr>
        <div className="d-flex h-100 justify-content-between fs-5">

          {" "}

          <button onClick={() => navigate(`edititem/${_id}`)} className="btn btn-light  w-40  btn-md "  style={{ borderRadius:" 7px 7px 7px 19px"}}>
             Edit Item
          </button>

       
           <button onClick={()=>handleDelete(name)} className="btn btn-light w-50 btn-md">
              Delet Item
          </button> 
        </div>

      </div>
    </div>
  );
}

export default  AdminCard