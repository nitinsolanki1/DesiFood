/* eslint-disable no-restricted-globals */
import React from "react";
import { useNavigate } from 'react-router-dom'
import { useEffect , useState } from "react";
import Navbar from "./Navbar"
import "../css/userProfilePage.css"

const UserProfilePage = (props) =>{ 
    const navigate  = useNavigate()
    const [ userdata ,setUserData ] = useState()
    // const [ userOrders , serOrders ] = useState()
   
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


        const handleDelet = async() => {
            let a = confirm("do you want to delet this account")

        if(a){
        const email = localStorage.getItem("userEmail")

            await fetch("http://localhost:5000/api/deletUser" , {
                method : "post" , 
                headers : {
                    "Content-Type"  : "application/json"
                },
                body  : JSON.stringify({email})
            })
            
            localStorage.removeItem("userEmail")
            localStorage.removeItem("token")
            navigate("/register")
        }else{
            return;  
        }
        }
  
          
    return (
        <div className="userProfilePage profilePage">
            <Navbar/>
            
            {
                userdata && <div className="userDetail text-dark">
                    <h1>hello {userdata.name}</h1>
                    <h2>You can edit your information here</h2>
                    <button onClick={()=> navigate("/userProfileEdit")} className ="  mt-4 px-5 btn btn-warning">edit your information </button>
                    <button onClick={()=> navigate("/myorder")} className ="  mt-4 px-5 btn btn-warning">your all orders </button>
                    <button onClick={handleDelet} className ="  mt-4 btn btn-danger">Delet Account</button>
                </div>
            }
            
            
            
        </div>
    )
}   

export default UserProfilePage;