import React, { memo } from 'react'
import "../css/index.css"
import { Link, useNavigate } from 'react-router-dom'


 const AdminNavbar = () => {

 const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("useremail")
    navigate("/")
  }
  return (
    <>
           <nav style={{left: 0+"px" }}  className="navbar navbar-expand-lg  position-absolute  top-0 w-100 rounded-2 border-gray  mb-2 border-rounded-lg " >
            <div className="container-fluid">
                <a className="ms-4 navbar-brand" href="/">hello admin🖐️</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/admin/adminpage">Home</Link>
                     </li>

                
                    {
                    
                      (localStorage.getItem("token")) ? 
                      <>
                      <li className="nav-item">
                      <Link to="/admin/TotalOrder" className="nav-link active" aria-current="page" >Total order                    </Link>
                     </li>
                      <li className='nav-item'>
                      <Link to="/admin/AddItem" className="nav-link active" aria-current="page">Add item</Link>
                      </li>
                      <li className='nav-item'>
                      <Link to="/admin/useraccount" className="nav-link active" aria-current="page">Total Accounts</Link>
                      </li>
                   
                      
                      </>
                     
                      : ""
                    }
                    
        


                  
                </ul>
               
                  {(!localStorage.getItem("token")) ?
                <div className="btns d-flex gap-3 me-5">
                    <Link to="/login" className="btn px-4 botderblack btn-light btn md">login</Link>
                </div>
                  : 
                <div className="btns d-flex gap-3 me-5">
                 
                  <button className="btn px-4 botderblack btn-light btn md" onClick={handleLogout}>logout</button>
              </div>
                  }
            </div>
            </div>
        </nav> 

    </>
  )
}
export default memo(AdminNavbar)