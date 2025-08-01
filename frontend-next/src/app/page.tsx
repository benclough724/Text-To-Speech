"use client";
import React, { useState } from "react";
import api from "./api/api";

// Importing types for better type safety
import type { 
  FormSubmitHandler, 
  TextChangeHandler, 
  AudioGenerationRequest 
} from "../types";

const Home = () => {
  const [inputValue, setInputValue] = useState<string>(""); // Includes the state for the user inputted value
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // State for the audio data and setting the audio URL

  
  // Handles changes of the text area and updates it based on user inputted data
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  }

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAudioUrl("");
    try {
      console.log(inputValue);
      const requestData: AudioGenerationRequest = { text: inputValue };
      const response = await api.post(
        "/audio/",
        requestData,
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
      <h1>Hello</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:space-x-4 space-y-4 md:space-y-0">
          <form onSubmit={handleSubmit}>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your text"
            className="flex-1 h-40 border text-black border-b-slate-200 rounded-lg p-2"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition">
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
