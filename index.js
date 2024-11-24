const functions = require('@google-cloud/functions-framework');
const tf = require('@tensorflow/tfjs-node');
const express = require('express');

// Load the pre-trained model (TensorFlow.js)
let model;
async function loadModel() {
    model = await tf.loadLayersModel('file://./ai_model/model.json');
    console.log('Model loaded successfully');
}

loadModel().catch(err => console.error('Error loading model:', err));

// Set up Express app
const app = express();
app.use(express.json());

// Predict function for handling new support tickets
app.post('/predict', async (req, res) => {
    const { issueDescription } = req.body;

    if (!issueDescription) {
        return res.status(400).send('Issue description is required');
    }

    // Preprocess the text data (using the same preprocessing as in training)
    const vectorizer = new tf.TextVectorization();
    const input = vectorizer.adapt([issueDescription]);

    // Run inference on the model
    const prediction = model.predict(input);
    const predictedCategory = prediction.argMax(1).dataSync()[0];  // Get the predicted category index

    res.json({ predictedCategory });
});

functions.http('predictTicketCategory', app);
