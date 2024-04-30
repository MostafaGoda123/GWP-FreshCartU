import React, { useEffect, useState } from 'react'
import './Cart.css'
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Cart({getCartItems,deleteCartItem,updateCartItem}) {
   const [cart, setCart] = useState([])
   const [loading, setLoading] = useState(true)
   async function getCart(){
      let {data} = await getCartItems();
      setCart(data)
      setLoading(false)
   }
   async function deleteItem(productId){
      setLoading(true)
      let {data} = await deleteCartItem(productId);
      setCart(data)
      setLoading(false)
   }
   async function updateItem(productId,count){
      if (count === 0) {
         setLoading(true)
         let {data} = await deleteCartItem(productId);
         setCart(data)
         setLoading(false)
      }else {
         let {data} = await updateCartItem(productId,count);
         setCart(data)
      }
   }
   useEffect(() => {
      getCart()
   }, [])
   return <>
         {
            loading ?
            <div className="d-flex justify-content-center m-5">
               <SyncLoader size={15} color="#0aad0a" />
            </div>
            :
            <div className="cart p-2">
               <h2>Cart</h2>
               <p className='text-main m-0 pb-1'>numOfCartItems : {cart.numOfCartItems}</p>
               <p className='text-main m-0 pb-3'>totalCartPrice : {cart.data.totalCartPrice}</p>
               {
                  cart.data.products.map((product,index) => {
                     return  <div key={index} className="row p-2 border-1 border-bottom m-0 align-items-center">
                        <div className="col-1">
                           <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                        </div>
                        <div className="col-10 align-items-center">
                           <h3 className="h6 fw-bold m-0 pb-1">{product.product.title.split(" ").slice(0,3).join(" ")}</h3>
                           <p className='fw-semibold m-0 text-main'>Price : {product.price}</p>
                           <button onClick={()=>deleteItem(product.product.id)} className='btn text-danger p-0 '><i className="fas fa-trash-can me-2"></i>Remove</button>
                        </div>
                        <div className="col-1">
                           <button onClick={()=>updateItem(product.product.id,product.count+1)} className='border border-1 border-success p-0 px-1 rounded-1'>+</button>
                           <span className="mx-2">{product.count}</span>
                           <button onClick={()=>updateItem(product.product.id,product.count-1)} className='border border-1 border-success p-0 px-1 rounded-1'>-</button>
                        </div>
                     </div>
                  })
               }
               {cart.numOfCartItems !== 0 && <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light m-3'>Online Payment</Link>}
            </div>
         }
   </>
}
