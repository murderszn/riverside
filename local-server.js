// Local development server for testing the rewards webhook
// Run this with: node local-server.js
// Then visit: http://localhost:3000/rewards.html

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Import the Vercel API handler
const rewardsHandler = require('./api/rewards-signup.js').default;

// Create a wrapper for the Vercel handler
const handleRewardsSignup = async (req, res) => {
  // Convert Express req/res to Vercel format
  const vercelReq = {
    method: req.method,
    headers: req.headers,
    body: req.body,
    url: req.url
  };

  const vercelRes = {
    status: (code) => ({
      json: (data) => res.status(code).json(data),
      end: () => res.status(code).end()
    }),
    setHeader: (name, value) => res.setHeader(name, value),
    json: (data) => res.json(data)
  };

  return rewardsHandler(vercelReq, vercelRes);
};

// API routes
app.post('/api/rewards-signup', handleRewardsSignup);
app.options('/api/rewards-signup', (req, res) => res.status(200).end());

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve rewards page
app.get('/rewards.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'rewards.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Local development server running at http://localhost:${PORT}`);
  console.log(`📝 Test rewards form at: http://localhost:${PORT}/rewards.html`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/rewards-signup`);
});
