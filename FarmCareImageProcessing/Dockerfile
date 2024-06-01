FROM python:3.12

WORKDIR /home/python/flaskapp

COPY . .

RUN apt-get update && apt-get install -y libhdf5-dev
RUN pip install --no-binary h5py h5py
RUN pip install --no-cache-dir Flask
RUN pip install --no-cache-dir numpy
RUN pip install --no-cache-dir pillow
RUN python -m pip install tensorflow

CMD ["python", "main.py"]