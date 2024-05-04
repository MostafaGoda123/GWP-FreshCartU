import React from 'react'
import './MainSlider.css'
import slide1 from '../../images/slider-image-1.jpeg'
import slide2 from '../../images/slider-image-2.jpeg'
import slide3 from '../../images/slider-image-3.jpeg'
import img1 from '../../images/grocery-banner.png'
import img2 from '../../images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
   let settings = {
      dots: true,
      autoplay:true,
      autoplaySpeed:2000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false ,
      pauseOnFocus:true ,
   };
   return <>
      <div className="row gx-0 mt-3 mb-4">
         <div className="col-md-9 position-relative">
            <Slider {...settings}>
               <img src={slide1} className='w-100' height={400} alt="" />
               <img src={slide2} className='w-100' height={400} alt="" />
               <img src={slide3} className='w-100' height={400} alt="" />
            </Slider>
         </div>
         <div className="col-md-3">
            <img src={img1} className='w-100' height={200} alt="" />
            <img src={img2} className='w-100' height={200} alt="" />
         </div>
      </div>
   </>
}
