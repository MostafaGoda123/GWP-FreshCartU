import React, { useEffect, useState } from 'react'
import './Brands.css'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'

export default function Brands() {
   const [brands, setBrands] = useState([])
   const [loading, setLoading] = useState(false)
   async function getBrands() {
      setLoading(true)
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data)
      setLoading(false)
   }
   useEffect(()=>{
      getBrands()
   },[])
   return <>
            {
         loading ? 
         <div className="d-flex justify-content-center m-5">
            <SyncLoader size={15} color="#0aad0a" />
         </div>
         :
         <div className="row py-5">
            {
               brands.map(brand => {
                  return <div key={brand._id} className="col-lg-2 col-md-3 col-sm-6">
                     <img src={brand.image} className='w-100' alt="" />
                     <p>{brand.name}</p>
                  </div>
               })
            }
         </div>
      }
   </>
}
