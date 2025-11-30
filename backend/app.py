"""
Flask API for waste classification using MobileNetV2 Deep Learning model.

API Endpoints:
 - GET  /api/health   -> health status + model loaded
 - GET  /api/classes  -> list of waste categories
 - POST /api/predict  -> image classification (in-memory processing)
"""

import os
import io
import json
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Flask app
app = Flask(__name__)
CORS(app)

# Configuration
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, 'waste_classifier_mobilenet.h5')
CLASS_NAMES_JSON = os.path.join(BASE_DIR, 'class_names.json')
IMG_SIZE = (224, 224)

# Global variables
model = None
class_names = {}


def load_resources():
    """Load model and class names at startup."""
    global model, class_names
    
    # Load TensorFlow model
    try:
        if os.path.exists(MODEL_PATH):
            logger.info('Loading model from %s', MODEL_PATH)
            from tensorflow.keras.models import load_model
            model = load_model(MODEL_PATH)
            logger.info('✅ Model loaded successfully')
        else:
            logger.warning('⚠️  Model file not found at %s', MODEL_PATH)
    except Exception as e:
        logger.error('❌ Failed to load model: %s', e)
        model = None

    # Load class names
    try:
        if os.path.exists(CLASS_NAMES_JSON):
            with open(CLASS_NAMES_JSON, 'r') as f:
                class_names = json.load(f)
            logger.info('✅ Class names loaded: %d classes', len(class_names))
        else:
            logger.warning('⚠️  Class names file not found')
    except Exception as e:
        logger.error('❌ Failed to load class names: %s', e)


# Load resources on startup
load_resources()


def predict_image_from_bytes(image_bytes):
    """
    Predict waste class from image bytes.
    Returns (predicted_label, confidence_percentage)
    """
    if model is None:
        return None, 0.0

    try:
        # Load and preprocess image
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize(IMG_SIZE)
        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize to [0, 1]

        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        
        # Get class with highest probability
        predicted_idx = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0])) * 100.0
        
        # Map index to class name
        predicted_label = class_names.get(str(predicted_idx), 'Unknown')
        
        return predicted_label, confidence
        
    except Exception as e:
        logger.exception('Prediction error: %s', e)
        return None, 0.0


def get_bin_info(label):
    """Get bin category and degradability based on predicted label."""
    l = label.lower()
    
    if 'paper' in l or 'cardboard' in l:
        return 'Paper', True
    if 'plastic' in l:
        return 'Plastic', False
    if 'glass' in l:
        return 'Glass', False
    if 'metal' in l or 'can' in l or 'battery' in l:
        return 'Metal', False
    if any(k in l for k in ('bio', 'organic', 'food', 'compost')):
        return 'Organic', True
    if 'clothes' in l or 'footwear' in l:
        return 'Textile', False
    
    return 'Unknown', False


def get_risk_level(confidence_pct):
    """Determine risk level based on confidence."""
    if confidence_pct >= 80:
        return 'low'
    if confidence_pct >= 50:
        return 'medium'
    return 'high'


def get_disposal_tip(label):
    """Get disposal recommendation based on waste type."""
    l = label.lower()
    
    if 'paper' in l or 'cardboard' in l:
        return 'Recycle in paper bin. Remove tape/labels first.'
    if 'plastic' in l:
        return 'Check recycling number. Clean and dry before recycling.'
    if 'glass' in l:
        return 'Rinse clean and recycle. Remove lids/caps.'
    if 'metal' in l or 'can' in l:
        return 'Rinse and recycle. Highly recyclable!'
    if 'battery' in l:
        return 'Take to designated battery recycling center.'
    if any(k in l for k in ('bio', 'organic', 'food')):
        return 'Compost if possible, or use organic waste bin.'
    if 'clothes' in l or 'footwear' in l:
        return 'Donate if reusable, or textile recycling.'
    
    return 'Check local guidelines for proper disposal.'


# ==================== API ROUTES ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'classes_loaded': len(class_names),
        'processing': 'in-memory'
    })


@app.route('/api/classes', methods=['GET'])
def get_classes():
    """Get list of waste categories."""
    if not class_names:
        return jsonify({'error': 'Class names not loaded'}), 500
    
    try:
        # Build ordered list by index
        max_idx = max(int(k) for k in class_names.keys())
        classes_list = [class_names.get(str(i), 'Unknown') for i in range(max_idx + 1)]
        
        return jsonify({
            'classes': classes_list,
            'total': len(classes_list)
        })
    except Exception as e:
        logger.exception('Error getting classes: %s', e)
        return jsonify({'error': 'Failed to get classes'}), 500


@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predict waste type from uploaded image.
    Expects: multipart/form-data with 'image' field
    Returns: JSON with prediction results
    """
    # Validate request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    # Check model availability
    if model is None:
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500

    try:
        # Read image bytes
        image_bytes = file.read()
        
        # Make prediction
        label, confidence = predict_image_from_bytes(image_bytes)
        
        if label is None:
            return jsonify({'error': 'Prediction failed'}), 500

        # Get metadata
        category, degradable = get_bin_info(label)
        risk = get_risk_level(confidence)
        disposal_tip = get_disposal_tip(label)

        # Return results
        return jsonify({
            'predicted_class': label,
            'confidence': confidence / 100.0,
            'confidence_percentage': round(confidence, 2),
            'category': category,
            'degradable': degradable,
            'risk_level': risk,
            'disposal_tip': disposal_tip
        })
        
    except Exception as e:
        logger.exception('Error processing image: %s', e)
        return jsonify({'error': 'Failed to process image'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info('=' * 60)
    logger.info('🚀 Waste Classifier API Server')
    logger.info('=' * 60)
    logger.info('Model loaded: %s', '✅' if model else '❌')
    logger.info('Classes: %d', len(class_names))
    logger.info('Port: %d', port)
    logger.info('Debug: %s', debug)
    logger.info('=' * 60)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
