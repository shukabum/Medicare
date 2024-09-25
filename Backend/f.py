from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import fitz  # PyMuPDF for extracting text from PDF
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from flask_pymongo import PyMongo
from flask_cors import CORS 
import requests
import json
app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "*"}}) 

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb+srv://shibs1773:hLVnUejqlNk2nCdJ@cluster0.ekjvyjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)

ALLOWED_EXTENSIONS = {'pdf'}

url = "https://api.edenai.run/v2/text/summarize"



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_data):
    text = ''
    with fitz.open(file_data) as pdf:
        for page in pdf:
            text += page.get_text()
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'fileData' not in request.json:
        return jsonify({'message': 'No file data received'}), 400
    
    file_data = request.json['fileData']
    filename = request.json.get('filename', 'unknown.pdf')

    # Extract text from PDF
    text = extract_text_from_pdf(file_data)
    
    # Summarize text
    
    payload = {
    "response_as_dict": True,
    "attributes_as_list": False,
    "show_original_response": False,
    "output_sentences": 20,
    "providers": "microsoft",
    "text": text,
    "language": "en"
}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2Q3ZWU2YzItNTcxOS00NTYwLTg4NDQtOWYwZmY5MGQxMDk0IiwidHlwZSI6ImFwaV90b2tlbiJ9.vVVMpoMLwvw6AurKJ11gs7oAKhf7dSbJrPoUSKPWPFY"
    }

    rp = requests.post(url, json=payload, headers=headers)
    data = json.loads(rp.text)
    result = data["microsoft"]["result"]
   
    return jsonify({'summary': result}), 200

if __name__ == '__main__':
    app.run(debug=True)
