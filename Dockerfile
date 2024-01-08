FROM python:3.11-slim

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY main.py ./
COPY requirements.txt ./

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "main.py"]