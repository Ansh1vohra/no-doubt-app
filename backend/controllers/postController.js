const axios = require('axios');
const Post = require('../models/Post');

// Fetch from JSONPlaceholder and save to MongoDB
const fetchAndStorePosts = async (req, res) => {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        // Loop and store
        const operations = data.map(post => ({
            updateOne: {
                filter: { id: post.id },
                update: { $set: post },
                upsert: true
            }
        }));

        await Post.bulkWrite(operations);

        if (res) {
            res.status(200).json({ message: 'Posts fetched and stored successfully', count: data.length });
        } else {
            console.log('Posts fetched and stored successfully on startup');
        }
    } catch (error) {
        if (res) {
            res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
        } else {
            console.error('Failed to fetch posts on startup:', error.message);
        }
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ id: 1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get single post
const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findOne({ id: Number(req.params.id) });
        if (!post) {
             return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
         res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    fetchAndStorePosts,
    getPosts,
    getSinglePost
};
