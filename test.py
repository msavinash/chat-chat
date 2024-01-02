from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Clarifai
from pprint import pprint

import re

def preprocess(rawData):
    chatSplitPattern = "\d+/\d+/\d+, \d{1,2}:\d\d.*[ap]m - "
    chats = re.split(chatSplitPattern, rawData)[1:]             # Get messages
    # print(chats)
    for i in range(len(chats)):
        chats[i] = chats[i].replace("\n", " ")

    timestamps = re.findall(chatSplitPattern, rawData)

    data = []
    # print(chats)
    # print("ha")
    for i in range(len(chats)):
        if ": " in chats[i]:
            chats[i] = chats[i].replace("\n", " ")

            tmp = chats[i].split(": ")
            sender = tmp[0]
            message = ": ".join(tmp[1:])

            datapoint = {}
            datapoint["timestamp"] = timestamps[i][:-2]
            datapoint["message"] = message
            datapoint["sender"] = sender
            data.append(datapoint["sender"]+": "+datapoint["message"])
    return data


text = None
with open("chat.txt", errors="ignore") as f:
    text = f.read()
    # print(text)
    text = text.lower().replace("anoop", "justin")
    # print(text)

data = preprocess(text)
text = ["\n".join(data)]


# # loader = TextLoader("state_of_the_union.txt")
# # loader = TextLoader("chat.txt")
# loader = TextLoader("cleanedChat.txt")
# documents = loader.load()
# text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0, separator="\n")
# docs = text_splitter.split_documents(documents)



APP_ID = ""
USER_ID = ""
CLARIFAI_PAT = ""



# # Only once
# from clarifai.client.user import User
# client = User(user_id=USER_ID, pat=CLARIFAI_PAT)

# app = client.create_app(app_id="RAG", base_workflow="baai-general-embedding-base-en")



# # clarifai_vector_db = Clarifai.from_documents(user_id=USER_ID, app_id=APP_ID, documents=docs, pat=CLARIFAI_PAT, number_of_docs=3)
clarifai_vector_db = Clarifai(
    user_id=USER_ID,
    app_id=APP_ID,
    number_of_docs=3,
    pat=CLARIFAI_PAT
)



# simdocs = clarifai_vector_db.similarity_search("According to the document is justin looking for a Spotify paid plan")
# pprint(simdocs)




from langchain.llms import Clarifai
from langchain.chains import RetrievalQA

USER_ID = "openai"
APP_ID = "chat-completion"
MODEL_ID = "GPT-3_5-turbo"

clarifai_llm = Clarifai(pat=CLARIFAI_PAT, user_id=USER_ID, app_id=APP_ID, model_id=MODEL_ID)

qa = RetrievalQA.from_chain_type(llm=clarifai_llm, retriever=clarifai_vector_db.as_retriever(),chain_type="stuff")


# # qa.run("according to the document does avinash eat chicken?")
# # qa.run("According to the document is avinash looking for a job?")
# # qa.run("According to the document is anoop looking for a job?")
# ans = qa.run("According to the document is avinash looking for a Spotify paid plan?")
# ans = qa.run("According to the document what spotify plan is justin looking for?")
# # qa.run("According to the document what headphones does justin have?")
# print(ans)