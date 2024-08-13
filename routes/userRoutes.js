const express = require('express');
const auth = require('../middleware/authorization.js');
const { registerUser,
        loginUser,
        verifyTokenUser,
        updateUser } = require('../controllers/userController.js');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/login', loginUser);
userRouter.get('/verifytoken', auth, verifyTokenUser);
userRouter.put('/update', updateUser);

module.exports = userRouter;