import React,{useEffect,useState} from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import "../css/App.css"

 const TotalAccount = () => {
    const [userData,setData] = useState()
       useEffect(() => {
   
         const fetchdata = async() =>{
         //   const res = await axios.get("http://localhost:5000/api/getTotalOrder")
           const res = await axios.get("http://localhost:5000/api/getTotal")
         await setData(res.data.Result)
        //  console.log(orderdata)
         }
   
         fetchdata()
   
         
       }, [])
  return (
    <>
        <AdminNavbar/>
        <div className="totalAccount" >

    <table  class="table rounded  table-light border  mt-5 table-hover">
        <thead>

        <tr   className='table-warning' >
            <th scope="col" >no </th>
            <th scope="col">name </th>
            <th scope="col">email </th>
            <th scope="col">age </th>
            <th scope="col">location </th>
            <th scope="col">itemsInCart </th>
        </tr>
        </thead>
        <tbody>

        {userData ?   userData.filter((e)=> !e.isAdmin ).map((e,ind)=>{
            return <tr className='table-warning'>
                    <td>{ind+1}</td>
                    <td> {e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.age} </td>
                    <td> {e.Location}</td>
                    <td>{e.cart.length}</td>
                {/* <h1>{ind+1} --  {e.name} - {e.email} - {e.age} - {e.Location} - {e.cart.length}</h1> */}
            </tr>
        }): <h1>loading..</h1>}
        </tbody>

    </table>

     </div>
       
    </>
  )
}
export default TotalAccount