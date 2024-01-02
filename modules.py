from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Clarifai as ClarifaiVectorStore
from pprint import pprint
import re
from langchain.llms import Clarifai
from langchain.chains import RetrievalQA

def uploadDocument(text, user_id, app_id, pat):
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0, separator="\n")
    docs = text_splitter.split_documents([text])
    clarifai_vector_db = ClarifaiVectorStore.from_documents(user_id=user_id, app_id=app_id, documents=docs, pat=pat, number_of_docs=3)
    return clarifai_vector_db

def getDatabaseConnection(user_id, app_id, pat):
    clarifai_vector_db = ClarifaiVectorStore(
    user_id=user_id,
    app_id=app_id,
    number_of_docs=3,
    pat=pat
    )
    return clarifai_vector_db


def getSimilarDocuments(text, clarifai_vector_db):
    simdocs = clarifai_vector_db.similarity_search(text)
    return simdocs


def getAnswer(question, user_id, app_id, pat):
    inferenceUserId = "openai"
    inferenceAppId = "chat-completion"
    inferenceModelId = "GPT-3_5-turbo"

    clarifai_llm = Clarifai(pat=pat, user_id=inferenceUserId, app_id=inferenceAppId, model_id=inferenceModelId)

    clarifai_vector_db = getDatabaseConnection(user_id, app_id, pat)
    qa = RetrievalQA.from_chain_type(llm=clarifai_llm, retriever=clarifai_vector_db.as_retriever(),chain_type="stuff")
    ans = qa.run(question)
    return ans


def preprocessChatData(rawData, splitsize=100):
    ## split raw data into chunks of 1000 lines
    data = rawData.split("\n")
    chunks = [data[x:x+splitsize] for x in range(0, len(data), splitsize)]
    return chunks


# text = None
# with open("chat.txt", errors="ignore") as f:
#     text = f.read()
#     # print(text)
#     text = text.lower().replace("anoop", "justin")
#     # print(text)

# data = preprocess(text)
# text = ["\n".join(data)]


# # # loader = TextLoader("state_of_the_union.txt")
# # # loader = TextLoader("chat.txt")
# # loader = TextLoader("cleanedChat.txt")
# # documents = loader.load()
# # text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0, separator="\n")
# # docs = text_splitter.split_documents(documents)



# APP_ID = ""
# USER_ID = ""
# CLARIFAI_PAT = ""



# # Only once
# from clarifai.client.user import User
# client = User(user_id=USER_ID, pat=CLARIFAI_PAT)

# app = client.create_app(app_id="RAG", base_workflow="baai-general-embedding-base-en")



# # clarifai_vector_db = Clarifai.from_documents(user_id=USER_ID, app_id=APP_ID, documents=docs, pat=CLARIFAI_PAT, number_of_docs=3)
# clarifai_vector_db = Clarifai(
#     user_id=USER_ID,
#     app_id=APP_ID,
#     number_of_docs=3,
#     pat=CLARIFAI_PAT
# )



# simdocs = clarifai_vector_db.similarity_search("According to the document is justin looking for a Spotify paid plan")
# pprint(simdocs)




# from langchain.llms import Clarifai
# from langchain.chains import RetrievalQA

# USER_ID = "openai"
# APP_ID = "chat-completion"
# MODEL_ID = "GPT-3_5-turbo"

# clarifai_llm = Clarifai(pat=CLARIFAI_PAT, user_id=USER_ID, app_id=APP_ID, model_id=MODEL_ID)

