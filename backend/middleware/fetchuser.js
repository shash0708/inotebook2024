var jwt = require('jsonwebtoken');
const JWT_SECRET = "shashank@123";


const fetchuser =(req,res,next)=>{


const token = req.header('auth-token');
if(!token) return res.status(401).send({error:"please authenticate using a valid token"})

try {
    
    const data= jwt.verify(token,JWT_SECRET);
req.user = data.user;
next();
} catch (error) {
   res.status(401).send({error:"please authenticate using a valid token"})

}






}





module.exports = fetchuser;