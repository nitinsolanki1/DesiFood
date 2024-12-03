import React, { useState  ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/login.css"
import Navbar from './Navbar'

 const Register = () => {
let navigate = useNavigate()
  const [credentioal , setCredentiols] =  useState({ name : "" ,Location : "", email : " " ,password : "" , age : "" })

  const handelSubmit = async (e) => {
       e.preventDefault()
        const respons = await fetch("http://localhost:5000/api/CreateUser",{
          method : "POST" , 
          headers : {
                "Content-Type" : "application/json",
              },

              body : JSON.stringify({name:credentioal.name , age : credentioal.age , email : credentioal.email , password : credentioal.password,Location : credentioal.Location})
        })
        const json = await respons.json()
        // console.log(json)
        if(json.success === true){
          localStorage.setItem("token" , json.token)
          localStorage.setItem("userEmail" , credentioal.email)
          navigate("/")
        }
        if(!json.success){
          alert("username or email taken")
        }
  }

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token){
      console.log("you are not logen in  : " ,token)
     
    }
    else{
      console.log("you are logen in ")
      // console.log(token)

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
    <div className='loginpage row'>
      
      <Navbar/>
      
      

        <form className=' form  bg-denger  left register-form' method='post' onSubmit={handelSubmit}>

      <div className ="form-group mt-1">
        <input type="text" required className ="form-control" name="name" onChange={SetValue} value={credentioal.name}  placeholder="Enter name" />
      </div>

      <div className ="form-group mt-1">
        <input type="number" required className ="form-control"  name="age" onChange={SetValue} value={credentioal.age} placeholder="Enter age" />
      </div>

      <div className ="form-group mt-1">
        <input type="text" required className ="form-control" name="Location" onChange={SetValue} value={credentioal.Location} id="exampleInputEmail1"  placeholder="Enter Your location " />
      </div>

      <div className ="form-group mt-1">
        {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
        <input type="email" required  className ="form-control" name="email" onChange={SetValue} value={credentioal.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-dark">We'll never share your email with anyone else.</small>
      </div>

      <div className ="form-group my-3">
        {/* <label htmlFor="exampleInputPassword1">Password</label> */}
        <input type="text" required className="form-control" name="password" onChange={SetValue} value={credentioal.password} id="exampleInputPassword1" placeholder="Password" />
      </div>
    
      <input type="submit" value="submit" className =" mt-4 btn btn-success"/>
      <Link  to="/login" className =" text-white">All ready Have An Account</Link>
      
    </form>
</div>

  )
}

export default Register