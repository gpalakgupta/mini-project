
import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, f1_score
from sklearn.preprocessing import LabelEncoder
from lightgbm import LGBMClassifier
from lightgbm import early_stopping, log_evaluation
import joblib


df = pd.read_csv("C:\\Users\\DELL\\Downloads\\Disease and symptoms dataset.csv")


df.columns = df.columns.str.replace('[^A-Za-z0-9_]+', '_', regex=True)
print(df.columns)
print("done")


counts = df["diseases"].value_counts()
threshold = 5 
df["diseases"] = df["diseases"].apply(
    lambda d: d if counts[d] >= threshold else "Other"
)
print(df.columns)
print("done")


# 2. Separate features (symptoms) and target (diseases)
X = df.drop(columns=["diseases"])
y = df["diseases"]
print("done")



# 3. Encode target labels (disease names → numbers)
le = LabelEncoder()
y = le.fit_transform(y)
print("done")


# 4. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42,stratify=y
)
print("done")



# 5. Define LightGBM dataset
train_data = lgb.Dataset(X_train, label=y_train)
test_data = lgb.Dataset(X_test, label=y_test)
print("done")




model = LGBMClassifier(
    objective="multiclass",
    num_class=len(le.classes_),
    boosting_type="gbdt",
    num_leaves=31,
    learning_rate=0.05,
    feature_fraction=0.9,
    bagging_fraction=0.8,
    bagging_freq=5,
    n_estimators=1000,
    min_data_in_leaf=20,
    min_gain_to_split=0.01,
    class_weight="balanced"
)
print("done")




model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric="multi_logloss",
    callbacks=[early_stopping(stopping_rounds=50), log_evaluation(100)]
)
print("done")




if len(le.classes_) > 2:  
    # ✅ Multiclass case
    y_pred_proba = model.predict_proba(X_test)   # shape (n_samples, num_classes)
    y_pred_classes = y_pred_proba.argmax(axis=1)
else:
    # ✅ Binary case
    # LightGBM can return shape (n_samples,) for predict()
    y_pred_classes = model.predict(X_test)  
    # ensure integer labels
    y_pred_classes = np.array(y_pred_classes, dtype=int)
print("done")




print("Accuracy:", accuracy_score(y_test, y_pred_classes))
print(classification_report(y_test, y_pred_classes, target_names=le.classes_))
print("Macro F1:", f1_score(y_test, y_pred_classes, average="macro"))
print("Weighted F1:", f1_score(y_test, y_pred_classes, average="weighted"))



joblib.dump({'model': model, 'symptom_list': list(df.columns[1:]), 'label_encoder':le}, 'diagnose_model_with_features.pkl')
print("done")






