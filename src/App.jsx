import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import axios from 'axios';
import { Offline } from "react-detect-offline";
import ShippingAddress from './components/ShippingAddress/ShippingAddress';

function App() {
  let [userToken , setUserToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userToken") !== "" && localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"))
    }
  }, [])
  function checkOutSession(cartId,shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000
    `,{shippingAddress},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function addToCart(productId){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function getCartItems(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function deleteCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function updateCartItem(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }

  return (
    <div className="App">
      <Navbar userToken={userToken} setUserToken={setUserToken}/>
      <Offline><div className="offLine">Only shown offline (surprise!)</div></Offline>
      <div className="container py-4">
        <Routes>
          <Route exact path='/' element={<Home addToCart={addToCart} />} />
          <Route path='/allorders' element={<Home addToCart={addToCart} />} />
          <Route path='/cart' element={localStorage.getItem("userToken")?<Cart updateCartItem={updateCartItem} getCartItems={getCartItems} deleteCartItem={deleteCartItem} />:<Login etUserToken={setUserToken} />} />
          <Route path='/shippingaddress/:cartId' element={<ShippingAddress checkOutSession={checkOutSession}  />} />
          <Route path='/products' element={<Products  />} />
          <Route path='/productDetail/:id' element={<ProductDetail addToCart={addToCart}  />} />
          <Route path='/categories' element={<Categories  />} />
          <Route path='/brands' element={<Brands  />} />
          <Route path='/register' element={<Register setUserToken={setUserToken} />} />
          <Route path='/login' element={<Login setUserToken={setUserToken} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
