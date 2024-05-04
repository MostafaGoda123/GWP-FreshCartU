import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'

export default function Navbar({userToken , setUserToken}) {
   const [activeLink, setActiveLink] = useState(localStorage.getItem("activeLink")?localStorage.getItem("activeLink"):"Home")

   return <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
   <div className="container-fluid">
      <Link className="navbar-brand" to={`/`}>
         <img src={logo} alt="" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav justify-content-center w-100">
            <li className="nav-item">
               <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Home"?"active":""}`} to={`/`}>Home</Link>
            </li>
            <li className="nav-item">
               <Link onClick={(e)=>{
                  if (userToken==="") {
                     setActiveLink("Login");
                     localStorage.setItem("activeLink","Login");
                  }else {
                     setActiveLink(e.target.text)
                     localStorage.setItem("activeLink",e.target.text)}}} className={`nav-link ${activeLink==="Cart"?"active":""}`} to={`/cart`}>Cart</Link>
            </li>
            <li className="nav-item">
               <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Products"?"active":""}`} to={`/products`}>Products</Link>
            </li>
            <li className="nav-item">
               <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Categories"?"active":""}`} to={`/categories`}>Categories</Link>
            </li>
            <li className="nav-item">
               <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Brands"?"active":""}`} to={`/brands`}>Brands</Link>
            </li>
         </ul>
         <ul className="navbar-nav ms-auto">
            {
               userToken === "" ? 
               <>
                  <li className="nav-item">
                     <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Register"?"active":""}`} to={`/register`}>Register</Link>
                  </li>
                  <li className="nav-item">
                     <Link onClick={(e)=>{setActiveLink(e.target.text);localStorage.setItem("activeLink",e.target.text);}} className={`nav-link ${activeLink==="Login"?"active":""}`} to={`/login`}>Login</Link>
                  </li>
               </> 
               :
               <>
                  <li className="nav-item d-flex align-items-center">
                     <Link onClick={(e)=>{
                        setActiveLink("Login")
                        localStorage.setItem("activeLink","Login")
                        setUserToken("")
                        localStorage.setItem("userToken" , "")
                        localStorage.removeItem("userToken")
                     }} className={`nav-link ${activeLink==="LogOut"?"active":""}`} to={`/login`}>LogOut</Link>
                  </li>
               </>
            }

         </ul>
      </div>
   </div>
   </nav>

   </>
}

