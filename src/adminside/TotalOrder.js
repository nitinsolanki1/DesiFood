import React,{useEffect,useState} from 'react'
import "../css/totalOrder.css"
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

 const TotalOrder = () =>  {
 const [orderdata,setData] = useState()
    useEffect(() => {

      const fetchdata = async() =>{
      //   const res = await axios.get("http://localhost:5000/api/getTotalOrder")
        const res = await axios.get("http://localhost:5000/api/getTotal")
      await setData(res.data.Result)
      console.log(orderdata)
      }

      fetchdata()

      
    }, [])
    
  return (
    <> 
    <AdminNavbar/>

        <div className=" totalAccount">
        <table  class="table rounded  table-light border  mt-5 table-hover">
        <thead>

        <tr   className='table-warning' >
            <th scope="col" >no </th>
            <th scope="col">email </th>
            <th scope="col">totalOrder </th>
            
        </tr>
        </thead>
        <tbody>

        {orderdata ?   orderdata.filter((e)=> !e.isAdmin ).map((e,ind)=>{
            return <tr className='table-warning'>
                    <td>{ind+1}</td>
                    
                    <td>{e.email}</td>
                    <td>{e.orders.length}</td>
            </tr>
        }): <h1>loading..</h1>}
        </tbody>
    </table>

        </div>
    </>
  )
}
export default TotalOrder;