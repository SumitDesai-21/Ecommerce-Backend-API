import jwt from 'jsonwebtoken';

const auth = (req, res, next) =>{
    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try{
        if(!token){
            return res.status(401).json({success: false, messsage: "No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach user info to request for use in controller
        req.user = decoded;
        // if successfully verified execute next function 
        next(); // continue to controller
    }
    catch(error){
        res.json({success: false, messsage: "Invalid token"});
    }
}

export default auth;