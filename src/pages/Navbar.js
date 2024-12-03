import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/index.css"


 const Navbar = ()=> {
 const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("useremail")
    navigate("/")
  }
  return (
    <>
           <nav  className="navbar navbar-expand-lg  position-absolute top-0 w-100 rounded-2 border-gray  mb-2 border-rounded-lg " >
            <div className="container-fluid">
                <a className="ms-4 navbar-brand" href="/">DesiFood</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                     </li>

                
                    {
                    
                      (localStorage.getItem("token")) ? 
                      <>
                      <li className="nav-item">
                      <Link to="/myorder" className="nav-link active" aria-current="page" >my order                    </Link>
                     </li>
                      <li className='nav-item'>
                      <Link to="/SecondCart" className="nav-link active" aria-current="page">mycart</Link>
                      </li>
                      <li className='nav-item'>
                      <Link to="/profile" className="nav-link active" aria-current="page">profile</Link>
                      </li>
                   
                      
                      </>
                     
                      : ""
                    }
                    
        


                  
                </ul>
               
                  {(!localStorage.getItem("token")) ?
                <div className="btns d-flex gap-3 me-5">
                    {/* <Link to="/task2" className="btn px-4 botderblack btn-light btn md">task2</Link> */}
                    <Link to="/login" className="btn px-4 botderblack btn-light btn md">login</Link>
                    <Link to="/register" className="btn px-4 botderblack btn-light btn md">register</Link>
                </div>
                  : 
                <div className="btns d-flex gap-3 me-5">
                    {/* <Link to="/SecondCart" className="btn px-4 botderblack btn-light btn md">mycart</Link>
                    <Link to="/profile" className="btn px-4 botderblack btn-light md">profile</Link> */}
                  <button className="btn px-4 botderblack btn-light btn md" onClick={handleLogout}>logout</button>
              </div>
                  }
            </div>
            </div>
        </nav> 

    </>
  )
}

export default memo(Navbar)