import React, { useEffect, useState } from 'react'
import './ProductDetail.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import Slider from "react-slick";
import { Helmet } from 'react-helmet'

export default function ProductDetail({addToCart}) {
   let settings = {
      dots: false,
      autoplay:true,
      autoplaySpeed:2000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false 
   };
   async function postToCart(productId){
      await addToCart(productId);
      // let {data} = await addToCart(productId);
      // console.log(data);
   }

   let {id} = useParams()
   const [details, setDetails] = useState({})
   const [loading, setLoading] = useState(true)
   async function getDetails() {
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setDetails(data.data)
      setLoading(false)
   }
   useEffect(() => {
      getDetails()
   }, [])
   let navigate = useNavigate()

return <>
      {
         loading ?
         <div className="d-flex justify-content-center m-5">
            <SyncLoader size={15} color="#0aad0a" />
         </div>
         :
         <div className="row align-items-center py-5">
            <Helmet>
               <meta charSet="utf-8" />
               <title>{details.title}</title>
            </Helmet>
            <div className="col-md-4">
               <Slider {...settings}>
                  {details.images.map( (img , index) => <img src={img} key={index} className='w-100' alt={details.title} /> )}
               </Slider>
            </div>
            <div className="col-md-8">
               <div className="details p-2 rounded-1">
                  <h3 className='h5 text-success'>{details.title}</h3>
                  <p className='fw-semibold fs-4'>{details.description}</p>
                  <p className="mb-2">Sold : <span className="text-danger fw-semibold">{details.sold}</span></p>
                  <span className="mb-2 font-sm text-black-50">{details.category.name}</span>
                  <div className="d-flex mb-2 justify-content-between align-items-center font-sm">
                     <p><span className='me-2 text-decoration-line-through fs-5 text-black-50'>{Math.floor(details.price*1.1)}</span> <span className="fw-bold fs-4">{details.price}</span> EGP</p>
                     <span><i className="fas fa-star rating-color me-1"></i>{details.ratingsAverage}</span>
                  </div>
                  <div className='d-flex align-items-center gap-2'>
                     <select className='selectQuantity text-black rounded-2' name='Quantity'>
                        <optgroup label='Quantity' >
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                        </optgroup>
                     </select>
                     <button onClick={()=>localStorage.getItem("userToken")?postToCart(id):navigate('/login')} className="btn fs-5 fw-semibold bg-main text-white w-100 btn-sm" style={{height:'40px'}}>Add to cart</button>
                     <i className="fa-solid fa-heart text-dark text-opacity-50 bg-dark bg-opacity-25 rounded-2" onClick={(e)=>{e.target.classList.toggle("hearted")}}></i>
                  </div>
               </div>
            </div>
         </div>
      }
   </>
}

