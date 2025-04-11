import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'

import Home from './routes/home/Home';
import Dashboard from './routes/dashboard/Dashboard'
import Chat from './routes/chat/Chat'
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import SignInPage from './routes/signIn/SignInPage';
import SignUpPage from './routes/signUp/SignUpPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />
          },
          {
            path: "/dashboard/chats/:id",
            element: <Chat />
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);