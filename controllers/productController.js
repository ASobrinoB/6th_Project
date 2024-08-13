const Product = require('../models/Product');

app.post("/crear-Product", async(req, res) => {
    const { nombre, precio } = req.body
    try {
        const nuevaProduct = await Product.create({ nombre, precio })
        res.json(nuevaProduct)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando la Product",
            error: error.message
        })
    }
})

app.put("/actualizar-Product", async (req, res) => {
    const { id, nombre, precio } = req.body
    try {
        const actualizacionProduct = 
	        await Product.findByIdAndUpdate(id, { nombre, precio }, { new: true })
        res.json(actualizacionProduct)
    } catch (error) {       
        res.status(500).json({
            msg: "Hubo un error actualizando la Product",
            error
        })
    }
})

app.delete("/borrar-Product", async (req, res) => {
    const { id } = req.body
    try {
        const ProductBorrada = await Product.findByIdAndDelete({_id: id })
        res.json(ProductBorrada)
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error eliminando la Product",
            error
        })
    }
})


exports.getAllGuitars = async (req, res) => {
    try {
        const Products = await Product.find({});
        res.json({Products}) 
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al intentar obtener las Products",
            error
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Usuario.find({});
        res.json({users}) 
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error al intentar obtener los usuarios",
            error
        })
    }
}