const express = require('express');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const {body,validationResult} =require('express-validator');
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "shashank@123";
// @route   GET api/users
// Create a user using post "/api.auth/" Doesnt reuiqre auth
router.post('/createuser',[
    body("username",'Enter a valid name'),
    body("password",'Password must be atleast 5 characters').isLength({min:5}),
    body('email','Enter a valid email').isEmail()
],async(req,res)=>{
    let success=false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){return res.status(400).json({success,errors:errors.array()});}
try{
let user = await User.findOne({email : req.body.email});
if (user) {
    return res.status(400).json({success,error:"Sorry a user with this email already exisits"})

}

const salt = await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt);

user = await User.create({
    name:req.body.name,
    password:secPass,
    email:req.body.email
});
const data = {
    user:{
        id:user.id,

    }
}
const authtoken = jwt.sign(data,JWT_SECRET);
//   // Get the data from body of request and create an instance of User Model
//   const user = User(req.body);
//   user.save();
success=true;
res.json({ success, authtoken })
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal error occured");
}
})

router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req,res)=>{
  let success= false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }


const {email,password} =req.body;
try{
    let user = await User.findOne({email});
    if(!user){
        success= false;

        return res.status(400).json({error:"Please try login with correct credentials"})
    }

    const passwordCompare =await  bcrypt.compare(password,user.password);
    if(!passwordCompare){
        success= false;
        return res.status(400).json({success,error:'Please try login with correct credentials'})
    }

    const data = {
        user:{
            id:user.id,
    
        }
    }

const authtoken = jwt.sign(data,JWT_SECRET);
success= true;

res.json({ success, authtoken })
}catch(error){
console.error(error.message);
res.status(500).send("Internal server error occured")
}

});



//Router 3 : Get Loggined User Details using:Post "/api/api/getUser".login required
router.post('/getuser',fetchuser ,async(req,res)=>{

try {
    
    const userId=req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
} catch (error) {
    console.error(error.message);
res.status(500).send("Internal server error occured")

}
})


///auththenticate a user :post "/api/auth/login"
// router.post('/login', async (req, res) => {

module.exports = router;