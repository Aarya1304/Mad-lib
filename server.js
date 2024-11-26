const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true })); // Middleware to parse form data
server.use(logger('dev')); // Logger middleware

// Serve static files in the "public" directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route for random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Route for Mad Lib form submission
server.post('/ITC505/lab-7', (req, res) => {
  const { heroName, adjective, animal, pluralNoun, verb, adverb, treasure, place, villain } = req.body;

  // Validate all fields
  if (!heroName || !adjective || !animal || !pluralNoun || !verb || !adverb || !treasure || !place || !villain) {
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
      One day, the fearless explorer <strong>${heroName}</strong> set out on a <strong>${adjective}</strong> journey
      through the jungle. Accompanied by their loyal ${animal}, they swung through ${pluralNoun} and 
      decided to ${verb} <strong>${adverb}</strong>.
    </p>
    <p>
      Deep in the jungle, they discovered the legendary <strong>${treasure}</strong> hidden in the 
      <strong>${place}</strong>. But just as they were about to claim the treasure, the evil 
      <strong>${villain}</strong> appeared, determined to take it for themselves!
    </p>
    <p>
      After a dramatic standoff, ${heroName} cleverly outsmarted ${villain} and escaped with the 
      <strong>${treasure}</strong>, returning home as a true jungle hero!
    </p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `;
  res.send(madLib);
});

// Set up the server to use Heroku's dynamic port or default to 8080 for local development
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));
