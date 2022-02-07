FROM python:3 AS python_builder

# set work directory
WORKDIR /build

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .
RUN pip install --upgrade pip
RUN pip install -r /build/requirements.txt
#EXPOSE 8000
#ENTRYPOINT python3 manage.py runserver --noreload