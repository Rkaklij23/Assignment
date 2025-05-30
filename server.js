const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());

const API_KEY = '80c68cd12e222c930df892cfe2b2f5b8';

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: { 'x-apisports-key': API_KEY },
      params: {
        league: 39,
        season: 2023,            
        from: '2023-01-01',
        to: '2023-12-31'
      }
    });

    if (response.data.response.length === 0) {
      return res.status(404).json({ message: "No matches found for season 2023." });
    }

    const matches = response.data.response.map(match => ({
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      date: match.fixture.date
    }));

    res.json(matches);
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
