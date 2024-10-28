import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <header>
            <Link to={"/"}>
                <img src='/logo.png' alt='Abey AI Logo' className='w-[48px] inline' />
                <span className='uppercase'>abey ai</span>
            </Link>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout