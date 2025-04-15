const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const analyticsRoutes = require('./routes/analytics.js');
app.use('/api', analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});