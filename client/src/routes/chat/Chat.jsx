import React from 'react';
import styles from '../../styles/Chat.module.css'
import NewPrompt from '../../components/newPrompt/NewPrompt';

const messages = [
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },
  { text: 'Test message from AI', isUser: false },
  { text: 'Test message from User', isUser: true },

];

const Chat = () => {
  return (
    <div className='h-full flex flex-col items-center relative'>
      <div className='flex-1 overflow-scroll w-full flex justify-center'>
        <div className='w-1/2 flex flex-col gap-[20px]'>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.isUser ? styles.user : ''}`}>
              {msg.text}
            </div>
          ))}
          <NewPrompt />
        </div>
      </div>
    </div>
  );
}

export default Chat