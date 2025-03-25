import React from 'react';
import styles from '../../styles/Home.module.css'
import { useAuth } from '@clerk/clerk-react';

const Dashboard = () => {

  const { userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value
    if (!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, text })
    })
  }

  return (
    <div className='h-full flex flex-col items-center'>
      <div className='flex-1 flex flex-col items-center justify-center w-1/2 gap-[50px]'>
        <div className='flex items-center gap-[20px] opacity-20'>
          <img src="/logo.png" alt="ABEY AI Logo" className='w-[64px] h-[64px]' />
          <h1 className={`uppercase text-[64px] ${styles.headerOne}`}>abey ai</h1>
        </div>
      </div>

      <div className='mt-auto w-1/2 bg-customCharade rounded-[20px] flex'>
        <form className='w-full h-full flex items-center justify-between gap-[20px] mb-[10px]' onSubmit={handleSubmit}>
          <input type='text' name='text' placeholder='Ask anything' className='flex-1 p-[20px] bg-transparent border-none outline-none text-customGallery' />
          <button className='bg-customMidGray rounded-[50%] border-none cursor-pointer p-[10px] flex items-center justify-center mr-[20px]'>
            <img src='/arrow.png' alt='Arrow Image' className='w-[16px] h-[16px]' />
          </button>
        </form>

      </div>

    </div>
  );
}

export default Dashboard;