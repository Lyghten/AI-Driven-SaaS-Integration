import React, { useState } from 'react';
import axios from 'axios';

const TicketPrediction = () => {
    const [ticketDescription, setTicketDescription] = useState('');
    const [predictedCategory, setPredictedCategory] = useState(null);

    const handlePrediction = async () => {
        try {
            const response = await axios.post('https://YOUR_CLOUD_FUNCTION_URL', {
                issueDescription: ticketDescription
            });
            setPredictedCategory(response.data.predictedCategory);
        } catch (error) {
            console.error('Error predicting ticket category:', error);
        }
    };

    return (
        <div>
            <h3>Customer Ticket Prediction</h3>
            <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                placeholder="Enter customer issue description"
            />
            <button onClick={handlePrediction}>Predict Category</button>

            {predictedCategory !== null && (
                <div>
                    <h4>Predicted Category: {predictedCategory}</h4>
                </div>
            )}
        </div>
    );
};

export default TicketPrediction;
