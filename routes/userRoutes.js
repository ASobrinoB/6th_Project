const express = require('express');
const auth = require('../middleware/authorization');
const { createUser, login, verifyToken } = require('../controllers/userController');


const userRouter = express.Router();

userRouter.post('/register', createUser); //http://localhost:3000/api/user/register
userRouter.post('/login', login); //http://localhost:3000/api/user/login
userRouter.get('/verifytoken', auth, verifyToken); //http://localhost:3000/api/user/verifytoken


module.exports = userRouter;