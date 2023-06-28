# syntax=docker/dockerfile:1

FROM python:3.8-alpine
COPY ./back/requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY /back  /app
ENTRYPOINT [ "python3" ]
CMD ["main.py" ]

