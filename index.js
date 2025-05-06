const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const TimeSchema = new mongoose.Schema({
  userId: String,
  domain: String,
  timeSpent: Number,
  date: Date
});

const TimeEntry = mongoose.model('TimeEntry', TimeSchema);

app.post('/save-time', async (req, res) => {
  const { userId, domain, timeSpent, date } = req.body;
  await TimeEntry.create({ userId, domain, timeSpent, date });
  res.sendStatus(200);
});

app.get('/analytics/:userId', async (req, res) => {
  const data = await TimeEntry.find({ userId: req.params.userId });
  res.json(data);
});

app.listen(5000, () => console.log('Server running on port 5000'));
