import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminAddItem = ()=> {
  const navigate = useNavigate()
  const  [ data,setData ] = useState({ CategoryName : "" , name :""  ,  img : "" , options: [{   full :'',   half:''}], descriptionate : "" })
  
const handelSubmit = async(e) => {
  e.preventDefault()
      try {
        const response = await axios.post("http://localhost:5000/api/admin/additem",data , {
          headers: {
            "Content-Type": "application/json"
          }
        });
        const json = response.data;
        console.log("json=>",json.msg,json.success)
        if(!json.success){
          alert("plase change the name")
          return;
        }
        if(json.success){
          alert("item addded")
          navigate("/admin/Adminpage")


        }
      } catch (error) {
        console.error('Error occurred:', error);  // Handle error
      }

 
     
}
    const SetValue = (e) => {
        setData({
            ...data,
            [e.target.name]  : e.target.value
          })
            console.log( data)
    }
  return (
    <div className="bg-ternary ">
        <AdminNavbar/>
        <h1 className="text-dark ">➕Add New Item</h1>
             <form className='form ' style={{height:"fit-content ",width :"50vw" , borderRadius : 10+"px"}} onSubmit={handelSubmit}>
             {/* //  CategoryName , name , img  , options , descriptionate */}

             <div className ="form-group mt-1">
            <input type="text" required className ="form-control" name="CategoryName" onChange={SetValue} value={data.CategoryName}  placeholder="Enter categoryname" />
            </div>

            <div className ="form-group mt-1">
            <input type="test" required className ="form-control"  name="name" onChange={SetValue} value={data.name} placeholder="Enter name" />
            </div>

            

            <div className ="form-group mt-1">
            <input type="text" required  className ="form-control" name="img" onChange={SetValue} value={data.img} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter image url" />
            </div>

            <div className ="form-group my-3">
            <input type="text" required className="form-control" name="descriptionate" onChange={SetValue} value={data.descriptionate} id="exampleInputPassword1" placeholder="description" />
            </div>

            <div className ="form-group my-3">
            <input type="number" required className="form-control" name="full" onChange={(e) => setData({...data,options :[{full : e.target.value , half :( e.target.value)/1.8}] })} value={data.options[0].full} id="exampleInputPassword1" placeholder="enter full dish price" />
            {/* <input type="number" required className="form-control" name="half" onChange={(e)=>SetValue({...data ,  : e.target.value})} value={data.options[0].half} id="exampleInputPassword1" placeholder="enter half dish price" /> */}
            </div> 

            <input type="submit" value="Add Item" className =" mt-4 btn btn-warning"/>

</form>
    </div>
  )
}
export default  AdminAddItem