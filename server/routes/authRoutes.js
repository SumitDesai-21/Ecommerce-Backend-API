import express from 'express'
import { getProfile, login, register } from '../controllers/authController.js'
import auth from '../middlewares/authMiddleware.js'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', auth, getProfile);

export default authRouter;

