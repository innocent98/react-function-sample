/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


/** please makesure this configuration is written in another file and you will import the storage where needed */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnT73evbQt-qYRXv4YwxpczNUKNE0CgiQ",
  authDomain: "fikefit-images.firebaseapp.com",
  projectId: "fikefit-images",
  storageBucket: "fikefit-images.appspot.com",
  messagingSenderId: "41161523144",
  appId: "1:41161523144:web:cd841529156a561ba7cafd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
/** end of configuration */

const InputPopup = () => {
  // State to manage selected input type
  const [selectedInput, setSelectedInput] = useState("");
  const [progress, setProgress] = useState(0);

  // State for current input value
  const [currentValue, setCurrentValue] = useState("");

  // State to manage all inputs in an array
  const [datas, setDatas] = useState([]);

  console.log(datas);

  // Handle input field selection
  const handleSelectInput = (inputType) => {
    setSelectedInput(inputType);
    setCurrentValue(""); // Reset the current value when switching fields
  };

  // Handle form submission (onBlur or onSubmit)
  const handleSubmit = () => {
    if (currentValue) {
      setDatas((prevData) => [
        ...prevData,
        { data_type: selectedInput, data: currentValue },
      ]);
      setSelectedInput(""); // Close the input form after submission
    }
  };

  // Handle file uploads and determine the data_type dynamically
  const handleFileUpload = (file) => {
    let dataType = "unknown";

    // Determine file type (audio, image, video) based on MIME type
    if (file.type.startsWith("audio/")) {
      dataType = "audio";
    } else if (file.type.startsWith("image/")) {
      dataType = "image";
    } else if (file.type.startsWith("video/")) {
      dataType = "video";
    }

    // upload file to firebase and return file url
    const fileName = new Date().getTime() + file.name;
    // `/programs/${fileName}` this happen to be a name (unique name) given to each file uploaded. you can change/tailor 'programs/' to
    // your need or want because that will be the location of the file. so it can be 'programs', 'diets', 'workout', etc. respectively
    // ensure that ref, uploadBytesResumable, and getDownloadURL is imported from firebase
    const storageRef = ref(storage, `/programs/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update the datas array with the correct file type and file details
          setDatas((prevData) => [
            ...prevData,
            {
              data_type: dataType,
              data: downloadURL,
            },
          ]);
        });
      }
    );

    // // Update the datas array with the correct file type and file details
    // setDatas((prevData) => [
    //   ...prevData,
    //   {
    //     data_type: dataType,
    //     data: { name: file.name, type: file.type, size: file.size, file },
    //   },
    // ]);

    setSelectedInput(""); // Close input field after adding file
  };

  // Dynamic input rendering
  const renderInputField = () => {
    switch (selectedInput) {
      case "Text Editor":
      case "Title":
      case "URL":
      case "Number":
      case "Email":
        return (
          <input
            type={selectedInput === "Number" ? "number" : "text"}
            placeholder={`Enter ${selectedInput.toLowerCase()}`}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSubmit} // Update the array onBlur (can use button to submit too)
          />
        );

      case "Upload file":
        return (
          <input
            type="file"
            accept="audio/*,video/*,image/*,application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleFileUpload(file); // Handle file upload and dynamic type detection
              }
            }}
          />
        );

      case "Checkbox":
        return (
          <input
            type="checkbox"
            onChange={(e) =>
              setCurrentValue(e.target.checked ? "checked" : "unchecked")
            }
            onBlur={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Buttons to select input type */}
      <button onClick={() => handleSelectInput("Title")}>Title</button>
      <button onClick={() => handleSelectInput("Text Editor")}>
        Text Editor
      </button>
      <button onClick={() => handleSelectInput("Upload file")}>
        Upload File
      </button>
      <button onClick={() => handleSelectInput("Number")}>Number</button>
      <button onClick={() => handleSelectInput("URL")}>URL</button>
      <button onClick={() => handleSelectInput("Email")}>Email</button>
      <button onClick={() => handleSelectInput("Checkbox")}>Checkbox</button>

      <div>
        <h3>Select input type</h3>
        {renderInputField()} {/* Render the selected input field */}
      </div>

      {/* Show the added data */}
      <div>
        <h3>Added Data:</h3>
        <ul>
          {datas.map((data, index) => (
            <li key={index}>
              <strong>{data.data_type}:</strong>
              {data.data instanceof Object && data.data.file ? (
                <>
                  File Name: {data.data.name}, File Type: {data.data.type}, File
                  Size: {data.data.size} bytes
                </>
              ) : (
                data.data
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputPopup;
