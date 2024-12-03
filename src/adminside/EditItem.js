import React, { useEffect, useState } from "react"
import AdminNavbar from "./AdminNavbar"
import { useNavigate , useParams } from "react-router-dom"
import axios from "axios"

const EditItem = ({productname}) => {
    const navigate = useNavigate()
    const params = useParams()
   const [oldData,setOldData] = useState()
    useEffect(()=>{
       const editFunction = async () => {
        const respons = await axios.get(`http://localhost:5000/api/admin/getByID/${params.itemid}`)
        setOldData(respons.data.product)
       }
       editFunction()
    },[])

    const handleChange = (e) => {
        setOldData({
        ...oldData,
       [ e.target.name] : e.target.value
        }
    )
}

    const handelSubmit = async()=>{
        const respons = await axios.put(`http://localhost:5000/api/admin/updateitem/${params.itemid}`,oldData)
        navigate("/admin/adminpage")
    }

     return(
        <div>
            <AdminNavbar/>
                {/* this is edit item component {params.itemid} */}
                {oldData  ?
                 
                    
        <form  className=' form  bg-denger  left register-form' onSubmit={handelSubmit} method='put' style={{width:60+"vw"}} >

        <div className ="form-group mt-1">
        
        <input type="text" required className ="form-control" minLength={3} name="name" onChange={handleChange} value={oldData.name}  placeholder="Enter name" />
        </div>


        <div className ="form-group my-3">
        <input type="text" required className="form-control" minLength={3}  name="CategoryName" onChange={handleChange} value={oldData.CategoryName} id="exampleInputPassword1" placeholder="Password" />
        </div>

        <div className ="form-group my-3">
        <input type="text" required className="form-control" minLength={10}  name="img" onChange={handleChange} value={oldData.img} id="exampleInputPassword1" placeholder="Password" />
        </div>

        <div className ="form-group my-3">
        <input type="text" required className="form-control" minLength={13}  name="description" onChange={handleChange} value={oldData.description} id="exampleInputPassword1" placeholder="Password" />
        </div>

        <input type="submit" value="UPDATE" className =" mt-4 btn btn-warning"/>

        </form>
                : <h1>loading...</h1>}
            </div>  
    )
}

export default EditItem