import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from './Navbar'
import "../css/index.css"


export default function Homepage() {
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

}
      useEffect(()=>{
        displaydata()     
      },[])


      const filterCards = (e) => {
        setSeachValue(e.target.value)
      
       
                
        
    
      }
  return (
    < >
          <Navbar />
        
<div id="carouselExampleAutoplaying"  className="   carousel slide" data-bs-ride="carousel">
<div className="carousel-inner" style={{height : "98vh"}}>
    <div className="carousel-item active">
          <img src={require("../images/dish2.jpg")} className="d-block w-100 " alt="..." />
    
      
      </div>
  <div className="carousel-item">
      <img src={require("../images/dish4.jpg")} className="d-block w-100 " alt="..." />
     
  </div>
  
</div>

<input type="search" className='searchBar' value={searchValue} placeholder='search your dish 😋' onChange={filterCards}/>

<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>


<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>

     
<div className="cards container my-5  ">

<div className="row" >
              

              {/* all items  */}
              {
                fdata.filter((item)=>{
                  return(item.name.toLowerCase().includes(searchValue.toLowerCase(searchValue)))
                  
                }).map((data)=>{
                  
                  return (
                  
                        <Card key={data._id}
                        _id={data._id}
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
