from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/proxy")
async def proxy(data:dict):
    response = requests.get(data['url'])
    if response.status_code == 200:
        return json.loads(response.content) 
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)