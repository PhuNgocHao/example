const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/get', (req, res) => {
  res.json({
    message: 'This is a GET request!',
    user: {
      id: 1,
      name: 'Demo User',
      status: 'active'
    }
  });
});

app.post('/api/request', (req, res) => {
  const { customerName, message } = req.body;

  if (!customerName || !message) {
    return res.status(400).json({
      success: false,
      message: 'customerName and message are required.'
    });
  }

  res.status(201).json({
    success: true,
    message: 'Customer request received.',
    request: {
      customerName,
      message,
      status: 'received'
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});