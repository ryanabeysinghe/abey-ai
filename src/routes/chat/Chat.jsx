import React from "react";
import styles from "../../styles/Chat.module.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
//import chat from "../../../../backend/models/chat";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const messages = [
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
  { text: "Test message from AI", isUser: false },
  { text: "Test message from User", isUser: true },
];

const Chat = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="h-full flex flex-col items-center relative">
      <div className="flex-1 overflow-scroll w-full flex justify-center">
        <div className="w-1/2 flex flex-col gap-[20px]">
          {/* {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.isUser ? styles.user : ""}`}
            >
              {msg.text}
            </div>
          ))} */}

          {isPending
            ? "Loading..."
            : error
            ? "Error loading data!"
            : data?.history?.map((msg, index) => (
              <>
              {msg.img && (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}
                  path={msg.img}
                  height={300}
                  width={400}
                  transformation={[{ height: 300, width: 400 }]}
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                />
              )}
                <div className={`${msg.role === "user" ? styles.user : styles.message}`} key={index}>
                  <Markdown>{msg.parts[0].text}</Markdown>
                </div>
              </>
              ))}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
