// Enabling environment variables.
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const app = express();

// Setting up express middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// Use api routes.
app.use('/api', apiRoutes);

// A default response for requests not found.
app.use((req,res) => {
  console.error(`${req.method} Route not found: ${req.originalUrl}`)
  res.status(404).end()
})

async function main(){
// Start server once database is connected. Database to be connected when route is called.
  app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
  })
}
main();
