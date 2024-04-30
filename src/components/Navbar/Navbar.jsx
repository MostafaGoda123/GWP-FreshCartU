import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'

export default function Navbar({userToken , setUserToken}) {
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
            <ul className="navbar-nav">
            <li className="nav-item">
               <Link className="nav-link" to={`/`}>Home</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to={`/cart`}>Cart<i className="fa-solid fa-cart-shopping ms-1"></i></Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to={`/products`}>Products</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to={`/categories`}>Categories</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" to={`/brands`}>Brands</Link>
            </li>
         </ul>
         <ul className="navbar-nav ms-auto">
            {
               userToken === "" ? 
               <>
                  <li className="nav-item">
                     <Link className="nav-link" to={`/register`}>Register</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to={`/login`}>Login</Link>
                  </li>
               </> 
               :
               <>
                  <li className="nav-item d-flex align-items-center">
                     <Link onClick={()=> {
                        setUserToken("")
                        localStorage.setItem("userToken" , "")
                        localStorage.removeItem("userToken")
                     }} className="nav-link" to={`/login`}>LogOut</Link>
                  </li>
               </>
            }

         </ul>
      </div>
   </div>
   </nav>

   </>
}
