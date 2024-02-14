# RagChat.

## Overview

This project is a RAG-based AI search application designed for analyzing private chat data. By utilizing Retrieval-Augmented Generative (RAG) models, the system can get insights from private conversations, which conventional Large Language Models (LLMs) lack training on, all without requiring significant resources for fine-tuning. The application uses [FAISS](https://github.com/facebookresearch/faiss) for vector storage, HuggingFaceEmbeddings with "all-MiniLM-L6-v2" model for semantic LLM embedding, with Google PaLM 2 LLM for inference.

## Functionality

- Upload a chat conversation file in ".txt" format.
- Interact with an AI model based on the information in the conversation file.

## Motivation

- **Exploration of RAGs:** Utilizing RAGs presented an opportunity to delve into areas where conventional LLMs lack training, such as personal conversations.
- **Accessibility of Data:** Platforms like WhatsApp facilitate the export of chat data as text files.
- **Application Development:** The aim was to develop and deploy an application capable of leveraging this data to respond to user queries effectively.

## Demo
Explore the RagChat application [here](https://rag-chat-seven.vercel.app/)

https://github.com/msavinash/rag-chat/assets/73682349/e4f34323-2e75-40eb-9c35-b4eb0ea485c6


## How to Run

To run the RagChat. App locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/msavinash/rag-chat.git
   ```
2. **Navigate to the Directory:**
   ```bash
   cd rag-chat
   ```
3. **Install Python Dependencies:**
    ```bash
   pip install -r requirements.txt
   ```
4. **Configure Google PaLM 2 API Key:**
     Obtain a free API key from Google's hosted LLM (PaLM 2) service [here](https://makersuite.google.com/)
     Paste the key into the designated field in the ```main.py``` file
      ```bash
       API_KEY = ""            # "YOUR_API KEY_HERE
      ```
5. **Run Flask App:**
    ```bash
   python main.py
   ```
    This will start the Flask server on port  ```5000```
6. **Setup Frontend React Server:**
    In another terminal, navigate to the React project directory:
    ```bash
    cd rag-chat/rag-chat-react
   ```
7. **Install React Dependencies:**
    ```bash
   npm install --force
   ```
8. **Run React Server:r**
    ```bash
   npm start
   ```
