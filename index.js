const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');

require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(
    process.env.PORT,
    () => console.log('El servidor esta escuchando en el puerto -> ' + process.env.PORT)
);