import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './ui/Layout.tsx'
import Home from './pages/Home.tsx'
import Services from './pages/Services.tsx'
import Products from './pages/Products.tsx'
import Thumbnails from './pages/Thumbnails.tsx'
import Avatars from './pages/Avatars.tsx'
import HistoryPage from './pages/History.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'products', element: <Products /> },
      { path: 'thumbnails', element: <Thumbnails /> },
      { path: 'avatars', element: <Avatars /> },
      { path: 'history', element: <HistoryPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
