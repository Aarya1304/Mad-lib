const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true })); // Middleware to parse form data
server.use(logger('dev')); // Logger middleware

// Serve static files in the "public" directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route for Mad Lib form submission
server.post('/ITC505/lab-7', (req, res) => {
  const { noun, adjective, pluralNoun, verb, adverb } = req.body;

  // Validate all fields
  if (!noun || !adjective || !pluralNoun || !verb || !adverb) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  // Mad Lib story
  const madLib = `
    <h1>🌴 Your Jungle Adventure 🌿</h1>
    <p>
      One day, a curious <strong>${adjective}</strong> ${noun} went exploring in the jungle. They came across
      a group of ${pluralNoun} and decided to ${verb} <strong>${adverb}</strong>. 
    </p>
    <p>
      After an exciting day, the ${noun} returned home as a true adventurer!
    </p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `;
  res.send(madLib);
});

// Set up the server to use Heroku's dynamic port or default to 8080 for local development
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));
