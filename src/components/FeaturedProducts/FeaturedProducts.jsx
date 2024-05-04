import React from 'react'
import './FeaturedProducts.css'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'

export default function FeaturedProducts({addToCart}) {
   
   // const [products, setProducts] = useState([])
   // const [loading, setLoading] = useState(true)
   // async function getProducts() {
   //    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   //    setProducts(data.data)
   //    setLoading(false)
   // }
   // useEffect(() => {
   //    getProducts()
   // }, [])
   let navigate = useNavigate()
   function getProducts(){
      return axios.get("https://ecommerce.routemisr.com/api/v1/products")
   }
   let { data , isLoading } = useQuery("featuredProducts",getProducts)
   async function postToCart(productId){
      let {data} = await addToCart(productId);
      if (data.status === "success") {
         toast.success(data.message,{duration : 2000})
      }
   }
   return <>
      <h2 className='mb-3'>Featured Products</h2>
      {
         isLoading ? 
         <div className="d-flex justify-content-center m-5">
            <SyncLoader size={15} color="#0aad0a" />
         </div>
         :
         <div className="row">
            {data?.data.data.map(product => {
               return <div key={product.id} className="col-lg-2 col-md-3 col-sm-6 mb-4 shadow-sm">
                  <div className="product p-2 rounded-1">
                  <Link to={`/productDetail/${product.id}`} >
                     <img src={product.imageCover} className='w-100 mb-2' alt="" />
                     <span className="text-main font-sm">{product.category.name}</span>
                     <h3 className='h5'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                     <div className="d-flex justify-content-between align-items-center font-sm">
                        <span>{product.price} EGP</span>
                        <span><i className="fas fa-star rating-color me-1"></i>{product.ratingsAverage}</span>
                     </div>
                  </Link>
                     <button onClick={()=>{localStorage.getItem("userToken")?postToCart(product.id):navigate('/login')}} className="btn bg-main text-white w-100 btn-sm">Add to cart</button>
                  </div>
               </div>
            })}
         </div>
      }
   </>
}
