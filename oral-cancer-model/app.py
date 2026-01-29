from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model("model/CNN.h5")

@app.route('/')
def home():
    return "Model backend is running!"

def map_risk(prob):
    if prob < 0.4:
        return "HIGH"
    elif prob < 0.7:
        return "MEDIUM"
    else:
        return "LOW"

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        file = request.files['file']

        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        prediction = model.predict(img_array)
        confidence = float(prediction[0][0])
        risk = map_risk(confidence)

        return jsonify({
            "risk": risk,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
