// import React from 'react'
// import './Categories.css'

// export default function Categories() {
//    return <>
//    </>
// }
import React from 'react'
import './Categories.css'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function Categories() {
   function getCategories(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }
   let {data} = useQuery("Categories",getCategories)
   return <>
      <h1>All categories</h1>
      <div className="row my-3">
            {data?.data.data.map(category => {
               return <div key={category._id} className="col-lg-2 col-md-3 col-6 p-2">
                  <img src={category.image} className='w-100' height={200} alt="" />
                  <p>{category.name}</p>
               </div>
            })}
      </div>
   </>
}
