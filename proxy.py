from pathlib import Path
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

# class RequestData(BaseModel):
#     url: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static directory to serve files from it
app.mount("/", StaticFiles(directory="webmap"), name="webmap")

@app.post("/proxy")
async def proxy(data:dict):
    response = requests.get(data.url)
    if response.status_code == 200:
        return json.loads(response.content) 
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)