const jwt = require("jsonwebtoken");
const JWT_SECRET = "dhfkbdfdbcdh";

const fetchUser = (req , res , next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error: "Please Authenticate with a valid token1"});
    }

    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error: "Please Authenticate with a valid token2",message:error.message});
    }
}


module.exports = fetchUser;