const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/assembly', require('./routes/assembly'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
