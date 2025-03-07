import React from 'react';
import { Link } from 'react-router-dom';

//import styles from '../../styles/ChatHistory.module.css'

const ChatHistory = () => {
  return (
    <div className='flex flex-col h-full'>
        <span className='uppercase font-semibold text-[10px] mb-[10px]'>dashboard</span>
        <Link to={"/dashboard"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>Create a new chat</Link>
        <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>Explore ABEY AI</Link>
        <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>Contact</Link>
        <hr className='border-none bg-customLightGray h-[2px] opacity-[0.1] rounded-[5px] my-5' />

        <span className='uppercase font-semibold text-[10px] mb-[10px]'>recent chats</span>

        <div className='flex flex-col overflow-scroll'>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
            <Link to={"/"} className='p-[10px] rounded-[10px] hover:bg-customCharade'>My Chat title</Link>
        </div>

        <hr className='border-none bg-customLightGray h-[2px] opacity-[0.1] rounded-[5px] my-5' />

        <div className='mt-auto flex items-center gap-[10px] text-[12px]'>
            <img src="/logo.png" alt="ABEY AI Logo" className='w-[40px] h-[40px]' />
            <div className='flex flex-col'>
                <span className='first:font-semibold'>Upgrade plan</span>
                <span className='last:text-customGray'>More access to the best models</span>
            </div>
        </div>

    </div>
  );
};

export default ChatHistory;