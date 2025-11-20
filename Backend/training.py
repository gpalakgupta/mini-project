#IMPORT LIBRARIES
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from lightgbm import LGBMClassifier
import joblib

# LOAD DATASETS
# -----------------------------
symptom_df = pd.read_csv("dataset.csv")      # disease, symptoms
definition_df = pd.read_csv("symptom_Description.csv")   # disease, definition
precaution_df = pd.read_csv("symptom_precaution.csv")   # disease, precautions

# PREPROCESS SYMPTOMS
# --------------------------------------
symptom_cols = [col for col in symptom_df.columns if col.startswith("Symptom")]

# Combine all symptom columns into one text field
symptom_df["all_symptoms"] = symptom_df[symptom_cols] \
    .astype(str) \
    .apply(lambda row: " ".join([s for s in row if s != "nan"]), axis=1)

X = symptom_df["all_symptoms"]
y = symptom_df["Disease"]

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# TRAIN-TEST SPLIT
# --------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# --------------------------------------
# LIGHTGBM MODEL
# --------------------------------------
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("lgbm", LGBMClassifier(
        objective="multiclass",
        num_class=len(label_encoder.classes_),
        n_estimators=300,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8
    ))
])

# Train
model.fit(X_train, y_train)

print("Training Completed!")

# --------------------------------------
# EVALUATION
# --------------------------------------
y_pred = model.predict(X_test)

# Accuracy
acc = accuracy_score(y_test, y_pred)
print("\nAccuracy:", acc)

# Classification Report (Precision, Recall, F1-score)
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# Confusion Matrix
print("\nConfusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))


# Save pipeline (tfidf + lightgbm)
joblib.dump(model, "disease_prediction_model.pkl")

# Save the label encoder too
joblib.dump(label_encoder, "label_encoder.pkl")

print("Model and label encoder saved successfully!")