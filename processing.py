import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer

# Load the data from Google Cloud Storage or BigQuery
data = pd.read_csv("gs://your_bucket/support_tickets.csv")

# Preprocess the text data (Issue Description)
vectorizer = TfidfVectorizer(max_features=1000)
X_text = vectorizer.fit_transform(data['issue_description']).toarray()

# Encode categorical data (Category)
encoder = LabelEncoder()
y_category = encoder.fit_transform(data['category'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_text, y_category, test_size=0.2, random_state=42)
