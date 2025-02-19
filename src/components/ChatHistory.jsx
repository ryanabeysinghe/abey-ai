import React from 'react';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
  return (
    <div className='flex flex-col h-full'>
        <span>DASHBOARD</span>
        <Link to={"/dashboard"}>Create a new chat</Link>
        <Link to={"/"}>Explore ABEY AI</Link>
        <Link to={"/"}>Contact</Link>
        <hr className='border-none bg-customLightGray h-[2px] opacity-[0.1] rounded-[5px] m' />

        <div>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
            <Link to={"/"}>My Chat title</Link>
        </div>


        <div>
            <img src="/logo.png" alt="ABEY AI Logo" />
            <div>
                <span>Upgrade to ABEY AI Pro</span>
                <span>Get unlimited access to all features</span>
            </div>
        </div>

    </div>
  );
};

export default ChatHistory;