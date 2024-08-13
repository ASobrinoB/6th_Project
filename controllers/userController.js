const User = require('../models/userModel.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
