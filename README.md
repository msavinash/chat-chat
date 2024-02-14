# RagChat.

## Overview

A RAG-based AI search app for private chats data. This project uses RAGs to infer from private chat data that general LLMs are not  trained on without any fine-tuning. Uses FAISS vector store, HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2") for embedding LLM
and Google PaLM 2 LLM for inference.

## Functionality

- Upload a chat conversation file as ".txt"
- Chat with an AI model based on information in the conversation file

## Motivation

- Wanted to try out RAGs. What is an accessible source of information that LLMs are definitely not trained on? Personal conversations.
- WhatsApp allows exporting chats as a text file
- Building an app  that can use this information to answer queries

## Demo
You can check out the app [here](https://rag-chat-seven.vercel.app/)

https://github.com/msavinash/rag-chat/assets/73682349/e4f34323-2e75-40eb-9c35-b4eb0ea485c6


## How to Run

To run the RagChat. App locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/msavinash/rag-chat.git
   ```
2. **Change into working directory**
   ```bash
   cd rag-chat
   ```
3. **Install Python dependencies**
    ```bash
   pip install -r requirements.txt
   ```
4. **Setup Google PaLM 2 API key**
     Google provides their own hosted LLM for developers. You can get a free API key [here](https://makersuite.google.com/)
     Paste the API key in line indicated below in ```main.py``` file
      ```bash
       API_KEY = ""            # "YOUR_API KEY_HERE
      ```
5. **Run Flask app in main.py**
    ```bash
   python main.py
   ```
    This should run your Flask server on port  ```5000```
6. **Setup frontend React server**
    In another terminal, change into React project directory
    ```bash
    cd rag-chat/rag-chat-react
   ```
7. **Install React dependencies**
    ```bash
   npm install --force
   ```
8. **Run React server**
    ```bash
   npm start
   ```
