import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout.jsx"
import About from "./pages/About.jsx"
import Cart from "./pages/Cart.jsx"
import Collection from "./pages/Collection.jsx"
import Contact from "./pages/Contact.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Order from "./pages/Order.jsx"
import PlaceOrder from "./pages/PlaceOrder.jsx"
import Product from "./pages/Product.jsx"
import ShopContextProvider from './context/ShopContext.jsx';



const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Layout/>,
    children:[
      {path:"",element:<Home/>},
      {path:"about",element:<About/>},
      {path:"contactus",element:<Contact/>},
      {path:"cart",element:<Cart/>},
      {path:"collection",element:<Collection/>},
      {path:"login",element:<Login/>},
      {path:"orders",element:<Order/>},
      {path:"place-order",element:<PlaceOrder/>},
      {path:"product/:productId",element:<Product/>}
    ]
  },
]);

/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
    </Route>
  )
)


*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)