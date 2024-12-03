import React , {useEffect, useState} from 'react'
import Navbar from './Navbar'
export default function MyOrder() {

 const [orderData , setOrderData  ] = useState([])
 

    useEffect(()=>{
let useremail = localStorage.getItem("userEmail")
      console.log(useremail)
      const displaydata = async() => {
        const respons = await fetch("http://localhost:5000/api/myorder",{
            method : "POST" , 
            headers : {
                  "Content-Type" : "application/json",
                },
                body : JSON.stringify({email : useremail })
          })
          let data = await respons.json()
          await  setOrderData(data.order_data)   
         await console.log(orderData)  
        }

      displaydata() 
    },[])
  
    if(!orderData){
      return <h1>no ordered item</h1>
    }
  return (
<>

        <Navbar/>

      {
       orderData.length > 0 ? 
       <div className="cards  container my-8  p-5">
    <div className='row'> 


         { 
          
             orderData.map((orderDataItem)=>{
               return    <div className="card border bg-warning pt-2 text-dark" style={{width: "18rem" }}>
                     {/* <img src={"/"} className="card-img-top" alt="..." /> */}
                       <div className="card-body ">
                     <h5 className="card-title">{orderDataItem.name}</h5>

                       <div className="dbtn mt-2 d-flex justify-content-between  ">
                           <label for="qty " className="  text-dark text-capitalize fw-bold">quentity</label>
                           <div className="py-1 px-3  btn btn-success btn-sm" >{orderDataItem.qty}</div>
                         </div>

                         <div className="dbtn mt-2 d-flex justify-content-between ">
                         <label for="price " className=" text-dark text-capitalize fw-bold">size</label>
                               <div className="py-1 px-3  btn btn-success btn-sm" >{orderDataItem.size}</div>
                     </div>

                     <div className="dbtn mt-2 d-flex justify-content-between  ">
                           <label for="qty " className=" text-dark text-capitalize fw-bold">price</label>
                           <div className="py-1 px-3  btn btn-success btn-sm" >{orderDataItem.price}</div>
                         </div>
                   </div>
               </div>
                
              

 }) 
    }
        </div> 
        </div> 
        :
        <h1 className='text-dark bold'>no data to show</h1>
      }  
    
</>

  )
}
        

            
          