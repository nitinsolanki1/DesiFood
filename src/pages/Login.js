import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom'
import "../css/login.css"
import Navbar from './Navbar'

const Login =()=> {
  
  let  navigate = useNavigate()
  const [credentioal , setCredentiols] =  useState({ email : " " ,password : "" })

  const handelSubmit = async (e) => {
       e.preventDefault()
       alert(!localStorage.getItem("token"))
        const respons = await fetch("http://localhost:5000/api/loginuser",{
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
          navigate("/")

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


        <Navbar/>

        <form className='form  bg-denger text-dark  left ' method='post'   onSubmit={handelSubmit}>

    

      <div className ="form-group">
        <label htmlFor="exampleInputEmail1  text-dark  ">Email address</label>
        <input type="email" required className ="form-control" name="email" onChange={SetValue} value={credentioal.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        {/* <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small> */}
      </div>

      <div className ="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="text" required className="form-control" name="password" onChange={SetValue} value={credentioal.password} id="exampleInputPassword1" placeholder="Password" />
      </div>
    
      <input type="submit" value="submit" className =" mt-4 btn btn-success"/>
      <Link  to="/register" className ="   ">Don'n Have An Account</Link>
      <Link  to="/admin/login" className ="   ">login as a admin</Link>
      
      </form>

     

</div>

  )
}
export default Login