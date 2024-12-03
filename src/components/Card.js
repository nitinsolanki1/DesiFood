import React, { useEffect, useRef, useState } from "react";
// import {  useCart , useDispatchCart } from "./ContextReducer";
// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ _id, email,img, name, options, }) {

  // let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  // let data = useCart();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size]);

  // const handeleAddToCart = async () => {
  //   await dispatch({
  //     type: "add",
  //     id: _id,
  //     name: name,
  //     price: finalPrice,
  //     qty: qty,
  //     size: size,
  //   });
  // };

  const handeleAddToSecondCart =async () =>{
  
   let tkn = localStorage.getItem("token")
   if(!tkn) {
    return alert("please login first")
   }
    let userEmail = localStorage.getItem("userEmail");
    
 
     await fetch("http://localhost:5000/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        cartData: {name, price: finalPrice, qty, size }
      }),
    });
    // alert(email)
    // console.log(name,finalPrice,qty,size )
  }

  
  const handleOrder = async () => {
    
   let tkn = localStorage.getItem("token")
   if(!tkn) {
    return alert("please login first")
   }
    let userEmail =localStorage.getItem("userEmail")
    // console.log("userEmail=>",userEmail)
    let response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: { id: _id, email  : userEmail , name, price: finalPrice, qty, size },
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    // console.log("order ===", response);
    // if (response.status == 200) {
    //   dispatch({ type: "DROP" });
    // }
  };

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
          <button
            onClick={handleOrder}
            className="btn btn-light  w-40  btn-md "
            // style={{ borderRadius:" 7px 7px 7px 19px"}}

          >
            order
          </button>

          {/* <button
            onClick={handeleAddToCart}
            className="btn btn-light w-50 btn-md"
            style={{ borderRadius:" 7px 7px 19px 7px"}}
          >
            add To Cart
          </button> */}
          
           <button
            onClick={handeleAddToSecondCart}
            className="btn btn-light w-50 btn-md"
            // style={{ borderRadius:" 7px 7px 19px 7px"}}
          >
            add To Cart 
          </button> 
        </div>

      </div>
    </div>
  );
}
