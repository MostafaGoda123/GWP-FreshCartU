import React from 'react'
import './CategorySlider.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick';

export default function CategorySlider() {
   let settings = {
      dots: false,
      autoplay:true,
      autoplaySpeed: 2000,
      infinite: true,
      speed: 500,
      slidesToShow: 6 ,
      responsive: [
         {
            breakpoint: 992,
            settings: {
            slidesToShow: 5,
            },
         },
         {
            breakpoint: 768,
            settings: {
            slidesToShow: 4,
            },
         },
         {
            breakpoint: 600,
            settings: {
            slidesToShow: 3,
            },
         },
         ],     
      slidesToScroll: 1,
      arrows:false 
   };
   function getCategories(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }
   let {data} = useQuery("Categories",getCategories)
   return <>
      <div className="row mb-3">
         <Slider {...settings}>
            {data?.data.data.map(category => {
               return <div key={category._id} className="col-md-2 col-4 px-1">
                  <img src={category.image} className='w-100 rounded-2' style={{aspectRatio:'1/1'}} alt="" />
                  <p className='text-center'>{category.name}</p>
               </div>
            })}
         </Slider>

      </div>
   </>
}
