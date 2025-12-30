import Header from "./components/Header.jsx"
import SearchBox from "./components/SearchBox.jsx";
import Footer from "./components/Footer.jsx"
import { Outlet } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import ShopContextProvider from './context/ShopContext.jsx';



function Layout(){
    return(
        <>
        <ShopContextProvider>
        <ToastContainer />
        <Header/>
        <SearchBox/>
        <Outlet/>
        <Footer/>
        </ShopContextProvider>
        
        </>
    )
}

export default Layout