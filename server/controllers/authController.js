
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js';

// register user
const register = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success: false, message: "All fields are required"});
        }
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.json({success: false, message: 'Email already registered'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
        res.json({success: true, token, user: {id: newUser._id, name: newUser.name, email: newUser.email}});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const login = async(req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success: false, message: 'Email and password required'});
        }

        const user = await User.findOne({email}).select("+password");
        
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.json({success: false, message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.json({success: true, token, user: {id: user._id, name: user.name, email: user.email}});
    }
    catch(error){
       res.json({success: false, message: error.message});
    }
}

const getProfile = async(req, res)=>{
    try {
        const id = req.user.userId;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({success: false, message: "User doesn't exist"});
        }
        return res.json({success: true, user});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export { login, register, getProfile };