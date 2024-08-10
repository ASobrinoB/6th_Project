const express = require('express');
const app = express();
const cors = require('cors');

const connectDB = require('./config/db');

const Guitarra = require('./models/Guitarra');

const userRouter = require('./routes/userRoutes');
const guitarRouter = require('./routes/guitarRoutes');

require('dotenv').config();

connectDB();

// const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Permitir solicitudes sin origen (como Postman) o si el origen está en la lista permitida
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter) // http://localhost:3000/api/user
app.use('/api/product', guitarRouter); //http://localhost:3000/api/product


app.post("/crear-guitarra", async(req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevaGuitarra = await Guitarra.create({ nombre, precio })
        res.json(nuevaGuitarra)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando la guitarra",
            error: error.message
        })
    }
})

app.put("/actualizar-guitarra", async (req, res) => {
    const { id, nombre, precio } = req.body
    try {
        const actualizacionGuitarra = 
	        await Guitarra.findByIdAndUpdate(id, { nombre, precio }, { new: true })
        res.json(actualizacionGuitarra)
    } catch (error) {       
        res.status(500).json({
            msg: "Hubo un error actualizando la guitarra",
            error
        })
    }
})

app.delete("/borrar-guitarra", async (req, res) => {
    const { id } = req.body
    try {
        const guitarraBorrada = await Guitarra.findByIdAndDelete({_id: id })
        res.json(guitarraBorrada)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error eliminando la guitarra",
            error
        })
    }
})


app.listen(process.env.PORT, () => console.log('Servidor escuchando en el puerto ' + process.env.PORT))