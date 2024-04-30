import React from 'react'
import './ShippingAddress.css'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom';

export default function ShippingAddress({checkOutSession}) {

   let {cartId} = useParams()
   async function checkOut(values) {
      let {data} = await checkOutSession(cartId , values)
      if (data.status === 'success') {
         window.location.href = data.session.url
      }
   }
   let formik = useFormik({
      initialValues:{
         details:"",
         phone:"",
         city:""
      },onSubmit:checkOut
   })

   return <>
      <form onSubmit={formik.handleSubmit}>
         <label htmlFor="details">Details</label>
         <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3' />
         <label htmlFor="phone">Phone</label>
         <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
         <label htmlFor="city">City</label>
         <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3' />
         <button type='submit' className='btn bg-main text-light'>CheckOut</button>
      </form>
   </>
}
