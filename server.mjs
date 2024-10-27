import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// MongoDB connection
mongoose.connect('mongodb+srv://libashwareppam2003:Libash123@cluster0.50wy2.mongodb.net/');

// URL schema and model
const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
});

const Url = mongoose.model('Url', urlSchema);

// Route to shorten a URL
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = nanoid(7);

    const url = new Url({
        longUrl,
        shortUrl: `http://localhost:${PORT}/${shortUrl}`,
    });

    await url.save();
    res.json({ shortUrl: url.shortUrl });
});

// Route to redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
        return res.redirect(url.longUrl);
    }
    res.status(404).send('URL not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
