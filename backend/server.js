require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const { fetchAndStorePosts } = require('./controllers/postController');
const Post = require('./models/Post');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Fetch initial data on startup
fetchAndStorePosts();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Setup WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('message', async (message) => {
        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === 'search' && typeof parsedMessage.query === 'string') {
                const query = parsedMessage.query;
                
                // Search MongoDB
                const posts = await Post.find({
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { body: { $regex: query, $options: "i" } }
                    ]
                });

                ws.send(JSON.stringify({
                    type: 'results',
                    data: posts
                }));
            }
        } catch (error) {
            console.error('WebSocket message handling error:', error);
            ws.send(JSON.stringify({ type: 'error', message: 'Internal Server Error' }));
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
