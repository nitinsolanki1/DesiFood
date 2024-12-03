import React from 'react'
import "../css/userProfilePage.css"
import {useState , useEffect} from "react"

export default function UserProfilePageEdit() {

   const [userdata,setUserData ]  = useState()
    const getData = async() => {

        const email = localStorage.getItem("userEmail")
            const respons = await fetch("http://localhost:5000/api/getUserInfo" , {
                method : "POST" , 
                headers : {
                      "Content-Type" : "application/json",
                    },
                    
                    body : JSON.stringify({email})
           })

            const res = await respons.json()
            setUserData(res.user)
            console.log(userdata)
        }
  
       
        useEffect(()=>{
            getData()  
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        
        // console.log(name,age,email,password,location,cart)
  return (
  
        <div className='edituserpage row'>
      
      
      {
        userdata ? 
            <form className=' form  bg-denger  left register-form'  method='post' onSubmit={""}>

            <div className ="form-group mt-1">
              <input type="text" required className ="form-control"  value={userdata.name} name="name"   placeholder="Enter name" />
            </div>
        
            <div className ="form-group mt-1">
              <input type="number" required className ="form-control"  value={userdata.age}  name="age"  placeholder="Enter age" />
            </div>
        
            <div className ="form-group mt-1">
              <input type="text" required className ="form-control" name="Location"   value={userdata.Location} id="exampleInputEmail1"  placeholder="Enter Your location " />
            </div>
        
            <div className ="form-group mt-1">
              <input type="email" required  className ="form-control"  value={userdata.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-dark">We'll never share your email with anyone else.</small>
            </div>
        
            <div className ="form-group my-3">
              <input type="text" required className="form-control" name="password"   value={userdata.password} id="exampleInputPassword1" placeholder="Password" />
            </div>
          
            <input type="submit" value="submit" className =" mt-4 btn btn-warning"/>
            {/* <Link  to="/login" className =" text-white">All ready Have An Account</Link> */}
            
          </form>
         : <h1 style={{textAlign : "center"}}>getting data please wait........</h1>
      }

   
</div>      
        
  )
}
