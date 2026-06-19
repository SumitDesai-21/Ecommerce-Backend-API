import { User } from "../models/User.js";

const checkIfAdmin = async (req, res, next) =>{
    try {
        const id = req.user.userId;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({success: false, message: "User doesn't exiss"});
        }
        if(user.role !== 'ADMIN'){
            return res.status(403).json({success: false, message: "Access denied"});
        }
        // otherwise user is ADMIN
        next();
    } catch (error) {
        res.json({success: false, messsage: "Error occured"});
    }
}


export default checkIfAdmin;