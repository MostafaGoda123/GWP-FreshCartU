import React, { useState } from 'react'
import './Login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({setUserToken}) {

   const [loading, setLoading] = useState(false)
   const [apiError, setApiError] = useState("")
   let navigate = useNavigate()
   async function loginSubmit(values) {
      setLoading(true)
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      .catch(err => {
         setApiError(err.response.data.message)
         setLoading(false)
      } )
      if ( data.message === "success" ) {
         setLoading(false)
         localStorage.setItem("userToken",data.token)
         setUserToken(data.token)
         navigate('/')
      }
   }
   let validationSchema = Yup.object({
      email : Yup.string().required("email is required").email("invalid email"),
      password : Yup.string().required("password is required").matches(/^[A-Z][\w @]{5,10}$/,"invalid password ex(Ahmed123)"),
   }) 
   let formik = useFormik({
      initialValues:{
         email:"",
         password:"",
      },
      validationSchema
      ,
      onSubmit: loginSubmit
   })

   return (
      <div className="w-75 mx-auto py-4">
         { apiError?<div className="alert alert-danger text-center">{apiError}</div>:"" }
         <h1 className="">login Now</h1>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3'/>
            {formik.errors.email && formik.touched.email ?<div className="alert alert-danger p-2">{formik.errors.email}</div>:null}

            <label htmlFor="password">Password : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3'/>
            {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:null}

            {!loading?<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>
            :<button type='button' className='btn bg-main text-light'><SyncLoader size={8} color="#fff" /></button>}
            <p className="mt-2">Do You have an account ?<Link className='ps-2 text-primary' to={'/register'}>Register</Link></p>
         </form>
      </div>
   )
}
