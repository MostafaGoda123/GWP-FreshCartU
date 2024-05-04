import React from 'react'
import './Footer.css'

export default function Footer() {
   return <div className='w-100 text-center bg-main'>
   <div className="nav-item d-flex justify-content-center gap-3 fs-3 p-2">
      <a href="https://facebook.com" target='_blank' className='cursor-pointer' rel="noreferrer"><i className='fab fa-facebook text-light'></i></a>
      <a href="https://twitter.com" target='_blank' className='cursor-pointer' rel="noreferrer"><i className='fab fa-twitter text-light'></i></a>
      <a href="https://instagram.com" target='_blank' className='cursor-pointer' rel="noreferrer"><i className='fab fa-instagram text-light'></i></a>
      <a href="https://youtube.com" target='_blank' className='cursor-pointer' rel="noreferrer"><i className='fab fa-youtube text-light'></i></a>
   </div>
      <p className='p-2 text-black'>Made by : Eng\<span className='fw-semibold'>Mostafa El_Sayed</span></p>
   </div>
}
