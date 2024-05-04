import React from 'react'
import './Home.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider';

export default function Home({addToCart}) {
   return <>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts addToCart={addToCart} />
   </>
}
