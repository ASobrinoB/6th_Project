const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');

// swagger
const path = require("path");
const swaggerUI = require ("swagger-ui-express");
const swaggerJsDoc = require ("swagger-jsdoc");

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "NodeJS API Booking",
            version: "1.0.0",
        }, 
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: [`${path.join("", "./routes/*.js")}`],
};


require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

app.listen(
    process.env.PORT,
    () => console.log('El servidor esta escuchando en el puerto -> ' + process.env.PORT)
);