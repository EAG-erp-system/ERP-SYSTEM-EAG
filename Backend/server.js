require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const cors = require('cors');

// Routers
const authRouter = require('./routes/authRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routers
app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})