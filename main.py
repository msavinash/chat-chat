from flask import Flask, request, jsonify
from modules import getAnswer, getSimilarDocuments, uploadDocument, preprocessChatData
import re
import os
from pprint import pprint
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.llms import GooglePalm
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
# cors flask import 
from flask_cors import CORS


instructor_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
api_key = os.environ.get('API_KEY')
print(api_key)

llm = GooglePalm(google_api_key=api_key, temperature=0.9)

app = Flask(__name__)
CORS(app)

@app.route('/createVectorStore', methods=['POST'])
def createVectorStore():
    chatFile = request.files['chatFile']
    userId = request.form['userId']
    chunkSize = int(request.form['chunkSize'])
    chatData = chatFile.read().decode('utf-8', errors="ignore")
    ascii_only = re.sub(r'[^\x00-\x7F]+', '', chatData)
    with open(userId+".txt", "w") as f:
        f.write(ascii_only)
    loader = TextLoader(userId+".txt")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=chunkSize, chunk_overlap=0, separator="\n")
    docs = text_splitter.split_documents(documents)
    vectordb = FAISS.from_documents(documents=docs, embedding=instructor_embeddings)
    vectordb.save_local(userId)
    return jsonify({'status': 'success', "numDocs": len(docs)})



@app.route('/getAnswer', methods=['POST'])
def getAnswer():
    data = request.form
    query = data['query']
    userEmail = data['userId']
    vectordb = FAISS.load_local(userEmail, embeddings=instructor_embeddings)
    retriever = vectordb.as_retriever()
    chain = RetrievalQA.from_llm(llm=llm, retriever=retriever, return_source_documents=True)
    ans = chain(query)
    # pprint(ans)
    # print("-"*100)
    # print(dir(ans["source_documents"][0]))
    # print("-"*100)
    for index, doc in enumerate(ans["source_documents"]):
        ans["source_documents"][index] = doc.page_content
    # print(ans["source_documents"][0].page_content)
    return jsonify(ans)



if __name__ == '__main__':
    app.run(debug=True)