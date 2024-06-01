from flask import Flask, request, jsonify
from script import ImageClassifcation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Process the file (e.g., save it to a temporary location)
        # Then, perform classification on the file
        result = ImageClassifcation(file)
        return jsonify({"result": result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3005, debug=True)