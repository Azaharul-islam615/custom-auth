import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Homelayout from './Layout/Homelayout.jsx'
import Home from './Component/Home.jsx'
import Login from './Component/Login.jsx'
import Profile from './Profile.jsx'
import Register from './Component/Register.jsx'
import { ToastContainer } from 'react-toastify'
import "antd/dist/reset.css";
import AuthContext from './context/AuthContext.jsx'
import ProtectedRoute from './Component/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/", Component: Homelayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      {
        path: "profile", element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: "register", Component: Register }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthContext>
  </StrictMode>,
)
