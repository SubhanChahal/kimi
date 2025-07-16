const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY;
const MOONSHOT_URL = 'https://api.moonshot.cn/v1/chat/completions';

app.post('/kimi', async (req, res) => {
  try {
    const response = await axios.post(MOONSHOT_URL, req.body, {
      headers: {
        'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error forwarding request to Kimi API' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
