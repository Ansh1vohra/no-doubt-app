require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('🔌 Connected to MongoDB');
        
        console.log('🧹 Clearing old Latin posts...');
        await Post.deleteMany({});
        
        console.log('🌐 Fetching proper English posts from DummyJSON API...');
        // Request 50 English posts
        const { data } = await axios.get('https://dummyjson.com/posts?limit=50');
        
        console.log(`📥 Retrieved ${data.posts.length} posts. Saving into database...`);
        
        const operations = data.posts.map(post => ({
            updateOne: {
                filter: { id: post.id },
                update: { $set: { id: post.id, title: post.title, body: post.body, userId: post.userId } },
                upsert: true
            }
        }));

        await Post.bulkWrite(operations);
        
        console.log('✅ Database successfully replaced with English data!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Error seeding database:', err.message);
        process.exit(1);
    });
