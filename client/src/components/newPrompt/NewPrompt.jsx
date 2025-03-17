import React, { useRef, useEffect, useState } from "react";
import UploadFiles from "../uploadFiles/UploadFiles";
import { IKImage } from "imagekitio-react";

import model from "../../lib/googleGemini";
import ReactMarkdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    databaseData: {},
  });

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.databaseData]);

  const addPrompt = async (text) => {
    // const prompt = "Explain how AI works";
    setQuestion(text);
    const result = await model.generateContent(text);
    setAnswer(result.response.text());
    // console.log(result.response.text());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;

    if (!text) return;

    addPrompt(text);
  };

  return (
    <>
      {/* Add New Chat */}
      {img.isLoading && <div>Loading...</div>}
      {img.databaseData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}
          path={img.databaseData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && (
        <div className="bg-customCharade rounded-[20px] max-w-[80%] self-end p-[20px]">
          {question}
        </div>
      )}
      {answer && (
        <div className="p-[20px]">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
      {/* <button onClick={addPrompt}>Test AI</button> */}
      <div className="pb-[100px]" ref={endRef}></div>
      <form
        className="w-1/2 absolute bottom-0 bg-customCharade rounded-[20px] flex items-center gap-[20px] px-5 py-0"
        onSubmit={handleSubmit}
      >
        {/* <label htmlFor='file' className='rounded-[50%] bg-customMidGray border-none p-[10px] flex items-center justify-center cursor-pointer'>
                <img src='/attachment.png' alt='File Attachment Image' className='w-[16px] h-[16px]' />
            </label> */}
        <UploadFiles setImg={setImg} />
        <input
          id="file"
          type="file"
          multiple={false}
          hidden
          className="flex-1 p-[20px] border-none outline-none bg-transparent text-customGallery"
        />
        <input
          type="text"
          name="text"
          placeholder="Ask anything"
          className="flex-1 p-[20px] border-none outline-none bg-transparent text-customGallery"
        />
        <button className="rounded-[50%] bg-customMidGray border-none p-[10px] flex items-center justify-center cursor-pointer">
          <img
            src="/arrow.png"
            alt="Arrow Image"
            className="w-[16px] h-[16px]"
          />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
