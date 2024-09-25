import base64
from flask import Flask, request, jsonify
from io import BytesIO
import fitz  # PyMuPDF for extracting text from PDF
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

url = "https://api.edenai.run/v2/text/summarize"

def extract_text_from_pdf(file_data):
    text = ''
    # Open PDF from byte stream (after decoding base64)
    with fitz.open(stream=file_data, filetype="pdf") as pdf:
        for page in pdf:
            text += page.get_text()
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'fileData' not in request.json:
        return jsonify({'message': 'No file data received'}), 400

    file_data_base64 = request.json['fileData']
    filename = request.json.get('filename', 'unknown.pdf')

    # Decode base64 to get the PDF binary
    file_data = base64.b64decode(file_data_base64)

    # Extract text from the decoded PDF binary
    text = extract_text_from_pdf(file_data)

    # Summarize text using external API (EdenAI in this case)
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
        "authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2Q3ZWU2YzItNTcxOS00NTYwLTg4NDQtOWYwZmY5MGQxMDk0IiwidHlwZSI6ImFwaV90b2tlbiJ9.vVVMpoMLwvw6AurKJ11gs7oAKhf7dSbJrPoUSKPWPFY"
    }

    rp = requests.post(url, json=payload, headers=headers)
    data = json.loads(rp.text)
    result = data["microsoft"]["result"]

    return jsonify({'summary': result}), 200

if __name__ == '__main__':
    app.run(debug=True)
