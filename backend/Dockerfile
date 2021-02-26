FROM python:3.8-slim

ENV MICRO_SERVICE=/api
# RUN addgroup -S $APP_USER && adduser -S $APP_USER -G $APP_USER
# set work directory


RUN mkdir -p $MICRO_SERVICE
RUN mkdir -p $MICRO_SERVICE/static

# where the code lives
WORKDIR $MICRO_SERVICE

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install build dependencies for cryptography package (not required for python-slim)
# RUN apk add gcc musl-dev libffi-dev openssl-dev python3-dev libxft-dev libfreetype6 libfreetype6-dev

# install dependencies
RUN pip install --upgrade pip
# copy project
COPY . $MICRO_SERVICE
RUN pip install -r requirements.txt
# COPY ./entrypoint.sh $MICRO_SERVICE

# CMD ["/bin/bash", "/enigma/entrypoint.sh"]