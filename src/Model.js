import React from 'react'
import ReactDom from "react-dom"

const ModelStyle = {
    position : "fixed" , 
    top  : "50%" , 
    left : "50%" , 
    backgroundeColor : "rgb(34,34,34)" , 
    transform : "translate(-50% , -50%)",
    zIndex: 1000,
    height : "90%",
    width :"90%"
}


const OverlayStyle = {
    position : "fixed" , 
    top  : 0 , 
    left :  0 ,
    botton  : 0 , 
    right : 0 , 
    backgroundeColor : "rgb(0,0,0,.7)" , 
    transform : "translate(-50% , -50%)",
    zIndex: 1000,
   
}
export default function Model({children , onClose}) {
  return ReactDom.createPortal(

        <div style={OverlayStyle}>
        <div style={ModelStyle}>
            <button className='btn btn-denger fs-4' style={{marginLeft : "90%" , marginTop : "90%"}} onClick={onClose}>x</button>
            {children}
        </div>

        </div>
  ,
    document.getElementById("root2")
  )
}
