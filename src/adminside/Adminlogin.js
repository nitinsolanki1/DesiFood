import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import "../css/login.css"


export default function Adminlogin() {
  
  let  navigate = useNavigate()
  const [credentioal , setCredentiols] =  useState({ email : " " ,password : "" })

  const handelSubmit = async (e) => {
       e.preventDefault()
      //  alert(!localStorage.getItem("token"))
       
        const respons = await fetch("http://localhost:5000/api/adminLogin",{
          method : "POST" , 
          headers : {
                "Content-Type" : "application/json",
              },

              body : JSON.stringify({email : credentioal.email , password : credentioal.password})
        })

        var json = await respons.json()
        if(json.success === true){

          localStorage.setItem("token" , json.token)
          localStorage.setItem("userEmail" , credentioal.email)
          // alert(localStorage.getItem("userEmail"))
          navigate("/admin/Adminpage")

        }

     
        if(!json.success){
          alert("enter valid credentiols")
        }
  }


  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(!token){
      console.log("you are not logen in  : ")
     
    }
    else{
      console.log("you are logen in ")
      console.log(token)

    }
  },[])

  const SetValue = (event) => {
    setCredentiols(
             {  
              ...credentioal,
                [event.target.name] : event.target.value 
              }
              )

  }
  return (
    <div className="loginpage row" >


        <AdminNavbar/>

        <form className='form  bg-denger  left ' method='post'   onSubmit={handelSubmit}>

    
    <h1>hello admin 🖐️</h1>
      <div className ="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" required className ="form-control" name="email" onChange={SetValue} value={credentioal.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
        {/* <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small> */}
      </div>

      <div className ="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="text" required className="form-control" name="password" onChange={SetValue} value={credentioal.password} id="exampleInputPassword1"  />
      </div>
    
      <input type="submit" value="submit" className =" mt-4 btn btn-success"/>
      <Link  to="/login" className ="   text-dark">go to normal login</Link>
      
      </form>

     

</div>

  )
}
