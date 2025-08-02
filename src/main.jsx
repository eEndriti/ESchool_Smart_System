import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import './index.css'
import { UserProvider } from './components/Universal Files/UserContext.jsx'
import { ToastProvider } from './components/Universal Files/ToastProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
            <UserProvider>
                <ToastProvider defaultPosition='top-right'>
                    <RouterProvider router={router} />
                </ToastProvider>
            </UserProvider>
)