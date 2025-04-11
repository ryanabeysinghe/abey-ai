import React from 'react'
import styles from '../../styles/Home.module.css'
import { Link } from 'react-router-dom';

const Home = () => {

  // const test = async () => {
  //   await fetch("http://localhost:3000/api/test", {
  //     credentials: "include",
  //   });
  // };

  return (
    <div className='flex items-center gap-[6.25rem] h-full'>
      {/* <Link to={"/dashboard"}>Dashboard</Link> */}
      <img src='/planets.png' alt='Planets Image' className={`w-[50%] ${styles.planetImg}`} />
      <div className='flex-1 flex flex-col items-center justify-center gap-4 text-center'>
        <h1 className={`text-9xl uppercase ${styles.headerOne}`}>abey ai</h1>
        <h2 className='text-xl font-bold'>Unlock the power of AI: Your Instant Assistant!</h2>
        <h3 className='font-normal max-w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia bibendum nulla sed consectetur.</h3>
        {/* <button>Get Started</button> */}
        <Link to={"/dashboard"} className='rounded-3xl bg-customBlue mt-4 p-3 text-base ease-in-out duration-200 hover:bg-white hover:text-black'>Get Started</Link>

        {/* <button onClick={test}>TEST BACKEND AUTH</button> */}
      </div>  

      {/* 38:25 Timestamp for vid */}
      <div className='flex-1'>

      </div>

    </div>
  )
}

export default Home;