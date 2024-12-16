import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List 
from pathlib import Path
from openai import OpenAI

app = FastAPI()
client = openAI()

#Input model
class TTSInput(BaseModel):
    text: str

# React website origin
origins = {
    "http://localhost:3000"
} 

# add the cors middleware  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/audio/")
async def generate_audio():
    try:
        
        speech_file_path = Path(__file__).parent / "speech.mp3"
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input="Today is a wonderful day to build something people love!"
)
response.stream_to_file(speech_file_path)