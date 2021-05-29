require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./configs/mongodb.config');

const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(express.json());

// app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use('/api', apiRoutes);

app.listen(
  process.env.PORT,
  console.log(`Web application running on port: ${process.env.PORT}`)
);
