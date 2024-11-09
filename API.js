const express = require('express');
const cors = require('cors');
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static('.'))

// API endpoint to fetch data from DynamoDB
app.get('/fetchData1', async (req, res) => {
    try {
        const params = {
            TableName: 'iotDBv1', // Your DynamoDB table name
        };

        const client = new DynamoDBClient({ region: 'us-east-1' });
        const command = new ScanCommand(params);
        const response = await client.send(command);
        res.json(response.Items); // Return the items as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from DynamoDB');
    }
});

// API endpoint to fetch data from DynamoDB
app.get('/TempData', async (req, res) => {
    try {
        const params = {
            TableName: 'iotTempDBv1', // Your DynamoDB table name
        };

        const client = new DynamoDBClient({ region: 'us-east-1' });
        const command = new ScanCommand(params);
        const response = await client.send(command);
        res.json(response.Items); // Return the items as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from DynamoDB');
    }
});

// API endpoint to fetch data from DynamoDB
app.get('/AIData', async (req, res) => {
    try {
        const params = {
            TableName: 'iotDBv1', // Your DynamoDB table name
        };

        const client = new DynamoDBClient({ region: 'us-east-1' });
        const command = new ScanCommand(params);
        const response = await client.send(command);
                            const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI('AIzaSyAERQrh7FagDwbOC-1i7pEHby16vzkz5nM');

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
  temperature: 0.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
            type: "ARRAY",
            items: {
                type: "object",
                properties: {
                    "Food Name": {
                        type: "string"
                    },
                    "Ingredients": {
                        "type": "string"
                    },
                    "Reasons For Picking this Meal": {
                        "type": "string"
                    },
                    "Instructions": {
                        "type": "string"
                    }
                },
                required: [
                    "Food Name",
                    "Ingredients",
                    "Reasons For Picking this Meal",
                    "Instructions"
                ]
            }
        }
    }
});
  
  const result = await model.generateContent({
  contents: [
      {
      role: 'model',
      parts: [
        {
          text: 'You are an AI assisant that will help with creating possbile recipe using only the fiid the user have. All the information will be stored in multiple different objects. Please take advantage of all the information given to you',
        },
      ],
    },
    {
      role: 'user',
      parts: [{text: JSON.stringify(response.Items)}],
    },
  ],
  
});
        res.json(result); // Return the items as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from DynamoDB');
    }
});

const PORT = process.env.PORT || 8080; // Cloud9 uses port 8080 by default
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
