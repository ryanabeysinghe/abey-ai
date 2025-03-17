import React, { useRef } from "react";

import { IKContext, IKImage, IKUpload } from "imagekitio-react";

/* Documentation: https://imagekit.io/docs/integration/react#uploading-files-in-react */

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

// console.log("Public Key:", publicKey);
// console.log("URL Endpoint:", urlEndpoint);

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const UploadFiles = ({ setImg }) => {
  const iKUploadRef = useRef(null);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, databaseData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  /* This function is used for image recognition */
  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      {/* ...client side upload component goes here */}
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={iKUploadRef}
      />
      {
        <label onClick={() => iKUploadRef.current.click()}>
          <img
            src="/attachment.png"
            alt="File Attachment Image"
            className="w-[16px] h-[16px]"
          />
        </label>
      }
    </IKContext>
  );
};

export default UploadFiles;
