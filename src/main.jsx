import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import './index.css'
import { UserProvider } from './components/Universal Files/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
            <UserProvider><RouterProvider router={router} /></UserProvider>
)