from pathlib import Path
from openai import OpenAI
openai.api_key = "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"
 
speech_file_path = Path(__file__).parent / "speech.mp3"
response = openai.audio.speech.create(
  model="tts-1",
  voice="alloy",
  input="Today is a wonderful day to build something people love!"
)

response.stream_to_file(speech_file_path)