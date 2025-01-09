import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List 
from pathlib import Path
from openai import OpenAI
import base64

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


# Post to get the openai info
@app.post("/audio/")
async def generate_audio(data: TTSInput):
    try:
        
        print(type(data.text))
        print("1")
        speech_file_path = Path(__file__).parent / "speech.mp3"
        print("2")
        response = client.audio.speech.create(
            model="tts-1",
            voice="fable",
            input=data.text
        )
        print("3")
         
        
       #Save audio file
        response.stream_to_file(speech_file_path)
            
        print("6")
       #Return the audio file
        return FileResponse(speech_file_path, media_type="audio/mpeg", filename="speech.mp3")
    
    except Exception as e:
        #return JSONResponse("2")
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
    