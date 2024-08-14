const Product = require('../models/productModel.js');

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 example: "SKU12345"
 *               description:
 *                 type: string
 *                 example: "Descripción del producto"
 *               price:
 *                 type: number
 *                 example: 99.99
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/productModel.js'
 *       400:
 *         description: Error al crear el producto
 */

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

/**
 * @swagger
 * /api/product/readall:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '../models/productModel.js'
 *       500:
 *         description: Error al obtener los productos
 */

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

/**
 * @swagger
 * /api/product/readone/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/productModel.js'
 *       400:
 *         description: Producto no encontrado
 */

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

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 example: "SKU12345"
 *               description:
 *                 type: string
 *                 example: "Nueva descripción del producto"
 *               price:
 *                 type: number
 *                 example: 79.99
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/productModel.js'
 *       400:
 *         description: Error al actualizar el producto
 */

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

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/productModel.js'
 *       400:
 *         description: Error al eliminar el producto
 */

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