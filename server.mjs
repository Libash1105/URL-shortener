import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// MongoDB connection
mongoose.connect('mongodb+srv://libashwareppam2003:Libash123@cluster0.50wy2.mongodb.net/url-shortener')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// URL schema and model
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

// Route to shorten a URL
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = nanoid(7); // Generate a 7-character short URL

  const url = new Url({
    longUrl,
    shortUrl, // Store only the short identifier (e.g., 'abc123')
  });

  await url.save();
  
  // Return the full short URL to the client
  res.json({ shortUrl: `http://localhost:${PORT}/${shortUrl}` });
});

// Route to redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  
  // Find the original URL based on the short identifier
  const url = await Url.findOne({ shortUrl });
  
  if (url) {
    return res.redirect(url.longUrl);
  }

  res.status(404).send('URL not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
