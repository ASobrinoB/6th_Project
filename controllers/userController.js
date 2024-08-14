const User = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/userModel.js'
 *       400:
 *         description: Error al registrar el usuario
 */

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body

	try {
        let foundUser = await User.findOne({ email })
        if (foundUser)
        {
        return res.status(400).json( { msg: "email ya existe" } )
        }

        const salt = await bcryptjs.genSalt(10)

		const hashedPassword = await bcryptjs.hash(password, salt)
        
        const respuestaDB = await User.create ({ username, email, password: hashedPassword })
		
        return res.json(respuestaDB)
        }

        catch (error)

        {
        return res.status(400).json( { msg: error } )
        }
};

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Inicia sesión con usuario y contraseña
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Token de autenticación generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Error al iniciar sesión
 */

exports.loginUser = async(req, res) => {
    const { email, password } = req.body

    try {
        let foundUser = await User.findOne({ email })
        if (!foundUser)
        {
        return res.status(400).json({msg: "email o usuario incorrecto"})
        }

        const passwordCorrecta = await bcryptjs.compare(password, foundUser.password)
        
        if (!passwordCorrecta)
        {
        return await res.status(400).json({msg: "email o usuario incorrecto"})
        }

        const payload = { user: { id: foundUser.id } }

        jwt.sign ( payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) =>
            { if (error) throw error; 
              res.json ({ token }) 
            }
                 )

        } catch (error) {
          res.json ({ msg: "login del usuario con problemas", error })
    }
}

/**
 * @swagger
 * /api/user/verifytoken:
 *   get:
 *     summary: Verifica el token del usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario verificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/userModel.js'
 *       500:
 *         description: Error al verificar el token
 */

exports.verifyTokenUser = async (req, res) => {
	try {
		const usuario = await User.findById(req.user.id).select('-password')

		res.json ({ usuario })

	    } 
        catch (error)
        {
	    res.status(500).json ({ msg: "login del usuario con problemas", error })
	    }
};

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Actualiza la información del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "60c72b2f9b1d8b001c8b4567"
 *               username:
 *                 type: string
 *                 example: "newusername"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/userModel.js'
 *       400:
 *         description: Error al actualizar el usuario
 */

exports.updateUser = async (req, res) => {
    const { id, username, email, password } = req.body;

    try {
        let foundUser = await User.findById(id);

        if (!foundUser)
        {
        return res.status(400).json({ msg: "id del usuario no existe" });
        }

        const updateData = { username: username || foundUser.username, email: email || foundUser.email, };

        if (password) 
        {
        const salt = await bcryptjs.genSalt(10);
        updateData.password = await bcryptjs.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        return res.json(updatedUser);

        }
        catch (error)
        {

        return res.status(400).json({ msg: error.message });
    }
};
