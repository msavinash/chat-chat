from flask import Flask, request, jsonify
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
from langchain.prompts import PromptTemplate

PROMPT_TEMPLATE = """Given the following context and question, generate an answer based on this context. Try to add reasons and explanations to your answer. 
                    If the answer is not found in the context, kindly state "I don't know", "I couldn't find this information" or similar phrases.
                    Be gramatically correct with your answer.

                    Context: {context}
                    Question: {question}
                    """

PROMPT_TEMPLATE = PromptTemplate(template=PROMPT_TEMPLATE, input_variables=["context", "question"])

USER_FILES = 'userFiles'
VECTOR_STORES = 'vectorStores'

# Create folders for storing user files and vector stores
if not os.path.exists(USER_FILES):
    os.makedirs(USER_FILES)
if not os.path.exists(VECTOR_STORES):
    os.makedirs(VECTOR_STORES)



instructor_embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
api_key = os.environ.get('API_KEY')
print(api_key)

llm = GooglePalm(google_api_key=api_key, temperature=0.3)

app = Flask(__name__)
CORS(app)


@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "success", "message": "pong"})

@app.route('/createVectorStore', methods=['POST'])
def createVectorStore():
    chatFile = request.files['chatFile']
    userId = request.form['userId']
    chunkSize = int(request.form['chunkSize'])
    chatData = chatFile.read().decode('utf-8', errors="ignore")
    ascii_only = re.sub(r'[^\x00-\x7F]+', '', chatData)
    with open(os.path.join(USER_FILES, userId+".txt"), "w") as f:
        f.write(ascii_only)
    loader = TextLoader(os.path.join(USER_FILES, userId+".txt"))
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=chunkSize, chunk_overlap=0, separator="\n")
    docs = text_splitter.split_documents(documents)
    vectordb = FAISS.from_documents(documents=docs, embedding=instructor_embeddings)
    vectordb.save_local(os.path.join(VECTOR_STORES, userId))
    return jsonify({'status': 'success', "numDocs": len(docs)})



@app.route('/getAnswer', methods=['POST'])
def getAnswer():
    data = request.form
    query = data['query']
    userId = data['userId']
    vectordb = FAISS.load_local(os.path.join(VECTOR_STORES, userId), embeddings=instructor_embeddings)
    retriever = vectordb.as_retriever(search_kwargs={"k": 10})
    # chain = RetrievalQA.from_llm(llm=llm, retriever=retriever, return_source_documents=True, combine_docs_chain_kwargs={"prompt_template": PROMPT_TEMPLATE})
    chain = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, return_source_documents=True, input_key="query", chain_type_kwargs={"prompt": PROMPT_TEMPLATE})
    ans = chain(query)
    pprint(ans)
    print("-"*100)
    # print(dir(ans["source_documents"][0]))
    # print("-"*100)
    for index, doc in enumerate(ans["source_documents"]):
        ans["source_documents"][index] = doc.page_content
    # print(ans["source_documents"][0].page_content)
    return jsonify(ans)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)