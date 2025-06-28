const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoroutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server Live: http://localhost:${PORT}`);
});
