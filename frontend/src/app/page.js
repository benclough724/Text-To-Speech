"use client";
import React, { useState } from "react";
import api from "./api";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post(
        "/audio",
        { inputValue },
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
        <div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col md:flex-row justify-between items-center md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your text"
              className="flex-1 h-40 border border-gray-300 rounded-lg p-2"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
