const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

// Routes
const authRoutes  = require('./routes/auth');

// Environement variable or you can say constants
env.config();

// Mongodb connection
// mongodb+srv://root:<password>@cluster0.ypwx9.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ypwx9.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
}).catch(err => {
    console.log(err);
});

app.use(bodyParser());

app.use('/api', authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});