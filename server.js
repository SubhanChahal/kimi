const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.send('Proxy running ✅');
});

app.post('/kimi', async (req, res) => {
  try {
    const response = await axios.post('https://api.moonshot.cn/v1/chat/completions', req.body, {
      headers: {
        Authorization: `Bearer ${process.env.MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Kimi error:', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || 'Proxy to Kimi failed',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

