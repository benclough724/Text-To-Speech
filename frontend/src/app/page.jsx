"use client";
import React, { useState } from "react";
import axios from 'axios';
import api from "./api";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(inputValue);
    try {
      console.log(inputValue);
      const response = await api.post(
        "/audio/",
        { text: inputValue },
        { responseType: "blob" }
      );
      
      const url = URL.createObjectURL(new Blob([response.data]));
      setAudioUrl(url);
    } catch (error) {
      console.error("audio error", error);
    }
  };

  return (
    <div className="bg-blue-500 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Text to speech app</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:space-x-4 space-y-4 md:space-y-0">
          <form>
          <textarea
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your text"
            className="flex-1 h-40 border border-gray-300 rounded-lg p-2"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
          </form>
          {audioUrl && (
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
