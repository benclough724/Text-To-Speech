import os
from dotenv import load_dotenv
load_dotenv()
from pathlib import Path
from openai import OpenAI
client = OpenAI()

speech_file_path = Path(__file__).parent / "speech.mp3"
response = client.audio.speech.create(
  model="tts-1",
  voice="Onyx",
  input="I am sat doing some coding. My pc is attached to my monitor which is attached to the wall."
)

response.stream_to_file(speech_file_path)