import React, { memo, useEffect, useState } from 'react'
import AdminCard from './AdminCard'
import "../css/index.css"

import AdminNavbar from './AdminNavbar'

const Adminpage = () => {
  const [fdata , setfdata ] = useState([])
  // const [fcategory , setfcategory ] = useState([])
  const [searchValue , setSeachValue ] = useState("")

const displaydata = async() => {
          const respons = await fetch("http://localhost:5000/api/display",{
              method : "POST" , 
              headers : {
                    "Content-Type" : "application/json",
                  },
            })
            var json = await respons.json()
            setfdata(json.data[0])
            // setfcategory(json.data[1])
           
}
      useEffect(()=>{
        displaydata()     
             
      },[])


      // const filterCards = (e) => {
      //   setSeachValue(e.target.value)     
      // }

  return (
    < >
          <AdminNavbar />
       

     
<div className="cards container my-5  ">

<div className="row" >
              

              {
                fdata.filter((item)=>{
                  return(item.name.toLowerCase().includes(searchValue.toLowerCase(searchValue)))
                  
                }).map((data)=>{
                  
                  return (
                  
                        <AdminCard key={data._id}
                        _id = {data._id}
                        options = {data.options[0] ? data.options[0] : []}
                        CategoryName = {data.CategoryName} 
                        description={data.description}
                        img={data.img} 
                        name={data.name} />
                        
                  )
                })
              }


   

</div>
           
            <div className='fotter'>
             👍hope you like the Project 😁😊
            </div>



        </div>
    </>
  )
}
export default memo(Adminpage)