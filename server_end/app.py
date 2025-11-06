from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

# Load the trained model once at startup
model = load_model("CNN.h5")

@app.route('/')
def home():
    return "Model backend is running!"

# Endpoint to receive an image and make prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    try:
        # Read image
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img = img.resize((128, 128))   # Match your model’s input size
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0


         # Make prediction
        prediction = model.predict(img_array)
        result = float(prediction[0][0])  # extract actual float value

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
