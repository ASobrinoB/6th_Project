const Product = require('../models/productModel.js');

exports.createProduct = async (req, res) => {
	const { sku, description, price } = req.body    

	try {
        let foundProduct = await Product.findOne({ sku })

        if (foundProduct)
        {
        return res.status(400).json( { msg: "producto ya existe" } )
        }

        const respuestaDB = await Product.create ({ sku, description, price })

		return res.json(respuestaDB)
        }
        catch (error)
        {
        return res.status(400).json( { msg: error } )
        }
};

exports.readAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({products})
        } 
        catch (error)
        {
        res.status(500).json({ msg: "problemas para extraer los productos", error })
        }
};

exports.readProductById = async (req, res) => {
    const id = req.params.id;

    try {
        let foundProduct = await Product.findById(id);

        if (!foundProduct)
        {
        return res.status(400).json({ msg: "id del producto no existe" });
        }
        res.json({ foundProduct })
        } 
        catch (error)
        {
        res.status(500).json({ msg: "producto no existe", error })
        }
};

exports.updateProductById = async (req, res) => {
    const id = req.params.id;
    const { sku, description, price } = req.body    

    try {
        let foundProduct = await Product.findById(id);

        if (!foundProduct)
        {
        return res.status(400).json({ msg: "id del producto no existe" });
        }

        const updateData = { sku: sku || foundProduct.sku, description: description || foundProduct.description, price: price || foundProduct.price };

        const updateProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        return res.json(updateProduct);

        }
        catch (error)
        {
        return res.status(400).json({ msg: error.message });
        }
};

exports.deleteProductById = async (req, res) => {
    const id = req.params.id;

    try {
        let foundProduct = await Product.findById(id);

        if (!foundProduct)
        {
        return res.status(400).json({ msg: "id del producto no existe" });
        }

        const ProductBorrado = await Product.findByIdAndDelete({_id: id })

        res.json(ProductBorrado)
        }
        catch (error)
        {
        return res.status(400).json({ msg: error.message });
        }
};