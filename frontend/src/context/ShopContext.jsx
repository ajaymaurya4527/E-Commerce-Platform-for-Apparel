import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";




export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency="$"

    const delivery_fee=10

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [search,setSearch]=useState("")

    const [showSearch,setShowSearch]=useState(false);

    const [cartItem,setCartItem]=useState({});

    const [products,setProducts]=useState([]);

    const [accessToken,setAccessToken]=useState("")

    const navigate=useNavigate();

    

    

    

    const addToCart=async (itemId,size)=>{
        let cartData=structuredClone(cartItem)

        if (!size){
            toast.error("please select product size")
            return;
        }

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else{
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        setCartItem(cartData);

    }

    const getCartCount=()=>{
        let totalCount=0;

        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if (cartItem[items][item]>0){
                        totalCount += cartItem[items][item];
                    }
                    
                } catch (error) {
                    
                }

            }
        }
        return totalCount;

    }

    const updateQuantity=async (itemId,size,quantity)=>{
        let cartData=structuredClone(cartItem)
        cartData[itemId][size]=quantity
         setCartItem(cartData);
    }

    const getCartAmount=()=>{

        let totalAmount=0;
        for(const items in cartItem){
            let itemInfo=products.find((product)=>product._id ===items);
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalAmount += itemInfo.price*cartItem[items][item]

                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;


    }

    const getProductsData=async ()=>{
        try {

            const response = await axios.get(backendUrl + "/product/list")
            if(response.data.success){
                setProducts(response.data.data)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            toast.error(error)
            
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!accessToken && localStorage.getItem("accessToken")){
            setAccessToken("accessToken")
        }
    },[])






    const value = {
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItem,setCartItem,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,
        backendUrl,accessToken,setAccessToken
    

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;

//we can use product anywhere using this context we didn't need pass to childern as props avoiding propdrilling