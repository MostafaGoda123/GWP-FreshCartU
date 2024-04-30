import React, { useState } from 'react'
import './Register.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Register({setUserToken}) {

   const [phoneNumber, setPhoneNumber] = useState('')
   const [loading, setLoading] = useState(false)
   const [apiError, setApiError] = useState("")
   let navigate = useNavigate()
   async function registerSubmit(values) {
      setLoading(true)
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
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
      console.log(data);
      console.log(values);
   }
   let validationSchema = Yup.object({
      name : Yup.string().required("name is required").min(3,"min length 3").max(15,"max length 15"),
      email : Yup.string().required("email is required").email("invalid email"),
      password : Yup.string().required("password is required").matches(/^[A-Z][\w @]{5,10}$/,"invalid password ex(Ahmed123)"),
      rePassword : Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],"not same password"),
      // phone : Yup.string().required("phone is required").matches(/^\d{10}$/,"invalid number")
      // .matches(/01[0125][0-9]{8}$/,"invalid phone")
   }) 
   let formik = useFormik({
      initialValues:{
         name:"",
         email:"",
         password:"",
         rePassword:"",
      },
      validationSchema
      ,
      onSubmit: registerSubmit
   })

   return (
      <div className="w-75 mx-auto py-4">
         { apiError?<div className="alert alert-danger text-center">{apiError}</div>:"" }
         <h1 className="">Register Now</h1>
         <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3'/>
            {formik.errors.name && formik.touched.name ?<div className="alert alert-danger px-2 py-1">{formik.errors.name}</div>:null}

            <label htmlFor="email">Email : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3'/>
            {formik.errors.email && formik.touched.email ?<div className="alert alert-danger px-2 py-1">{formik.errors.email}</div>:null}

            <label htmlFor="password">Password : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3'/>
            {formik.errors.password && formik.touched.password?<div className="alert alert-danger px-2 py-1">{formik.errors.password}</div>:null}


            <label htmlFor="rePassword">rePassword : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3'/>
            {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert alert-danger px-2 py-1">{formik.errors.rePassword}</div>:null}

            <label htmlFor="phone">Phone : </label>
            {/* <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3'/> */}
            <PhoneInput  onChange={(phone,country) => {
               setPhoneNumber(phone.split("").splice(Number(country.dialCode.length)).join(""))
            } } country={'eg'} id='phone' name='phone' className="mb-3 phoneNumberInput" />
            {/* <PhoneInput country={'eg'}  onChange={phone => console.log(phone)}/> */}
            {phoneNumber.length !== 10 && phoneNumber.length !==0 ?<div className="alert alert-danger px-2 py-1">{formik.errors.phone}</div>:null}

            {!loading?<button disabled={!(formik.isValid && formik.dirty&&phoneNumber.length===10)} type='submit' className='btn bg-main text-light'>Register</button>
            :<button type='button' className='btn bg-main text-light'><SyncLoader size={8} color="#fff" /></button>}
            <p className="mt-2">You have an account ?<Link className='ps-2 text-primary' to={'/login'}>Login</Link></p>
         </form>
      </div>
   )
}
