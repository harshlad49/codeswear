import "@/styles/globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import{ useRouter }from "next/router";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart , setCart] = useState({})
  const [subTotal , setSubTotal] = useState(0)
  const router = useRouter()
  const [user , setUser] = useState({value: null})
  const [key, setKey] = useState(0)


  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try{
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
        
        }
    }catch(error) {
      console.error(error);
      localStorage.clear()
      
    }
    
 
  const token = localStorage.getItem('token')
  if(token){
     setUser({value: token})
     setKey(Math.random())
  }
}, [router.query])
 const logout = ()=>{
  localStorage.removeItem("token")
  setUser({value: null})
  setKey(Math.random())
  router.push('/')
}
  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart))
      let subt = 0;
      let keys = Object.keys(myCart)
      for(let i=0; i<keys.length;i++){
        subt += myCart[keys[i]]["price"] * myCart[keys[i]].qty;
      }
      setSubTotal(subt)
     
    }
  
   
  const addToCart = (itemCode, qty, price, name, size, variant )=>{
    let newCart = cart;
    if(itemCode in cart){
    newCart[itemCode].qty = cart[itemCode].qty + qty
  }
  else{
   newCart[itemCode] = {itemCode ,qty: 1, price, name, size, variant }
  }
  setCart(newCart)
  saveCart(newCart)
  
}

 const clearCart = (itemCode, qty, price, name, size, variant ) =>{
  setCart({})
  saveCart({})
 }

 const buyNow = (itemCode, qty, price, name, size, variant)=>{ 
  let newCart ={itemCode: {qty: 1, price, name, size, variant }}
  
setCart(newCart)
saveCart(newCart)
console.log(newCart)
router.push('/checkout')
}
 

  const removeFromCart = (itemCode, qty, price, name, size,color, variant )=>{
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
    newCart[itemCode].qty = cart[itemCode].qty - qty
  }
  if(newCart[itemCode]["qty"]<=0){
    delete newCart[itemCode]
  }
  setCart(newCart)
  saveCart(newCart)
  
}
  return <>
   <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  <NavBar logout={logout} user={user} key= {key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
 <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
 <hr/>
 <Footer/>
 </>
}
