import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List 
from pathlib import Path
from openai import OpenAI

app = FastAPI()
client = OpenAI()

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
async def generate_audio(data: TTSInput):
    #try:
        
        #speech_file_path = Path(__file__).parent / "speech.mp3"
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            text=TTSInput
        )
        
        #response.stream_to_file(speech_file_path)
        
        # Save audio file
        audio_path = "output.mp3"
        with open(audio_path, "wb") as f:
            f.write(response['audio_content'])
        
        # Return the audio file
        return FileResponse(audio_path, media_type="audio/mpeg", filename="output.mp3")
    
    # except Exception as e:
    #     return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
    