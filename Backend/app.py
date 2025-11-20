from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import pandas as pd

# -------------------------
# Load model + label encoder + dataset
# -------------------------
model = load("disease_prediction_model.pkl")
label_encoder = load("label_encoder.pkl")
precaution_df = pd.read_csv("symptom_precaution.csv")

# -------------------------
# Initialize Flask app
# -------------------------
app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})  # Enable CORS for React frontend

# -------------------------
# Home route (for browser test)
# -------------------------
@app.route("/", methods=["GET"])
def home():
    return "Flask API is running! Use POST /predict to get disease prediction."

# -------------------------
# Prediction route
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms_input = data.get("symptoms", "")

    if not symptoms_input:
        return jsonify({"error": "No symptoms provided"}), 400

    # Predict disease
    encoded_pred = model.predict([symptoms_input])[0]
    predicted_disease = label_encoder.inverse_transform([encoded_pred])[0]

    # Get precautions
    row = precaution_df[precaution_df["Disease"] == predicted_disease]
    if row.empty:
        precautions = ["Not available"]
    else:
        precautions = row.iloc[0, 1:].dropna().tolist()

    return jsonify({
        "predicted_disease": predicted_disease,
        "precautions": precautions
    })

# -------------------------
# Run the Flask server
# -------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)



