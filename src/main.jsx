import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'

import Home from './routes/home/Home';
import Dashboard from './routes/dashboard/Dashboard'
import Chat from './routes/chat/Chat'
import RootLayout from './layouts/rootLayout/RootLayout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
