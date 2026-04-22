const authServices = require('./auth.services');

const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const data = await authServices.registerUser(name, email, password);
        res.status(201).json(
            {success:true,
             data,
             message:"user registered successfully"});
    }
    catch(error){
        console.error("Error in registerUser:",error);
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
};

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const data = await authServices.loginUser(email, password);
        res.status(200).json(
            {success:true,
                data,
            message:"Login successful"});
    }
    catch(error){
        console.error("Error in loginUser:",error);
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
};


const me = async (req,res)=>{

    const userId = req.user.id;
    if(!userId){
        return res.status(401).json({success:false,message:"Unauthorized"});
    }
    try{
        const userData = await authServices.me(userId);
        res.status(200).json({success:true,data:userData});
    }
    catch(error){
        console.error("Error in me:",error);
        res.status(500).json({success:false,message:"Server error"});
    }

}

module.exports = {registerUser,loginUser,me};