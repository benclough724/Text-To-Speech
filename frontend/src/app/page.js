"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default page behaviour
    alert(`Form submitted with value: ${inputValue}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your text"
            />
            <button type="submit">Submit</button>
          </form>
          <textarea>This is a text area 2</textarea>
        </div>
      </main>
    </div>
  );
}
