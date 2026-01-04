import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Layout from './Layout.jsx';
import Add from "./pages/Add.jsx"
import List from "./pages/List.jsx"
import Orders from "./pages/Orders.jsx"


const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {path:"/add",element:<Add />},
      {path:"/list",element:<List />},
      {path:"/orders",element:<Orders />}
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
