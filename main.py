"""
Main module for the RagChat application.
"""

import os
import re
# from pprint import pprint

from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import GooglePalm
from langchain.prompts import PromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS

PROMPT_TEMPLATE = """Given the following context and question, generate an answer based
                    on this context. Try to add reasons and explanations to your answer.
                    If the answer is not found in the context, kindly state "I don't know",
                    "I couldn't find this information" or similar phrases.
                    Be grammatically correct with your answer.

                    Context: {context}
                    Question: {question}
                    """

PROMPT_TEMPLATE = PromptTemplate(template=PROMPT_TEMPLATE, input_variables=["context", "question"])

USER_FILES = 'userFiles'
VECTOR_STORES = 'vectorStores'

# Create folders for storing user files and vector stores
os.makedirs(USER_FILES, exist_ok=True)
os.makedirs(VECTOR_STORES, exist_ok=True)

instructor_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
# api_key = os.environ.get('API_KEY')
API_KEY = ""            # "YOUR_API KEY_HERE
# print(api_key)

llm = GooglePalm(google_api_key=API_KEY, temperature=0.3)

app = Flask(__name__)
CORS(app)


@app.route("/ping", methods=["GET"])
def ping():
    """
    Ping endpoint to check if the server is running.
    """
    return jsonify({"status": "success", "message": "pong"})


@app.route('/createVectorStore', methods=['POST'])
def create_vector_store():
    """
    Endpoint to create a vector store from uploaded chat data.
    """
    chat_file = request.files['chatFile']
    user_id = request.form['userId']
    chunk_size = int(request.form['chunkSize'])
    chat_data = chat_file.read().decode('utf-8', errors="ignore")
    ascii_only = re.sub(r'[^\x00-\x7F]+', '', chat_data)
    with open(os.path.join(USER_FILES, f"{user_id}.txt"), "w", encoding="utf-8") as f:
        f.write(ascii_only)
    loader = TextLoader(os.path.join(USER_FILES, f"{user_id}.txt"))
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=0, separator="\n")
    docs = text_splitter.split_documents(documents)
    vectordb = FAISS.from_documents(documents=docs, embedding=instructor_embeddings)
    vectordb.save_local(os.path.join(VECTOR_STORES, user_id))
    return jsonify({'status': 'success', "numDocs": len(docs)})


@app.route('/getAnswer', methods=['POST'])
def get_answer():
    """
    Endpoint to get an answer based on the provided query.
    """
    data = request.form
    query = data['query']
    user_id = data['userId']
    vector_store_path = os.path.join(VECTOR_STORES, user_id)
    vectordb = FAISS.load_local(vector_store_path, embeddings=instructor_embeddings)
    retriever = vectordb.as_retriever(search_kwargs={"k": 10})
    chain = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff",
                retriever=retriever, return_source_documents=True, input_key="query",
                chain_type_kwargs={"prompt": PROMPT_TEMPLATE})
    ans = chain(query)
    for index, doc in enumerate(ans["source_documents"]):
        ans["source_documents"][index] = doc.page_content
    return jsonify(ans)


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=80)
    app.run(port=5000, debug=True)
