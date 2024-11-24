const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function logPredictionToBigQuery(ticketId, predictedCategory) {
    const datasetId = 'support_data';
    const tableId = 'predictions';

    const rows = [{
        ticketId: ticketId,
        predictedCategory: predictedCategory,
        timestamp: new Date(),
    }];

    await bigquery.dataset(datasetId).table(tableId).insert(rows);
    console.log('Prediction logged to BigQuery');
}
