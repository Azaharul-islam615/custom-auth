import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router'
import Homelayout from './Layout/Homelayout.jsx'
import Home from './Component/Home.jsx'
import Login from './Component/Login.jsx'
import Profile from './Profile.jsx'
import Register from './Component/Register.jsx'

const router=createBrowserRouter([
  {path:"/",Component:Homelayout,
    children:[
      {index:true,Component:Home},
      {path:"login",Component:Login},
      {path:"profile",Component:Profile},
      {
        path:"register",Component:Register
      }
    ]


  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
