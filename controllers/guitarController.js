const Guitarra = require('../models/Guitarra');

exports.getAllGuitars = async (req, res) => {
    try {
        const guitarras = await Guitarra.find({});
        res.json({guitarras}) 
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al intentar obtener las guitarras",
            error
        })
    }
}