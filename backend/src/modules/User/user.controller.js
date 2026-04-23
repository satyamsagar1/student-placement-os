const userServices = require('./user.services');
const userValidation = require('./user.validation');

const getUserProfile =async(req,res)=>{
    try{
        const userId = req.user.id;

        const userData =await userServices.getUserProfile(userId);
        res.status(200).json({success:true,data:userData});
    }
    catch(error){
        console.error("Error in getUserProfile:",error);
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
}


const updateUserProfile =async(req,res)=>{
    try{
        const userId = req.user.id;
        const body = req.body;
        console.log("Received update profile request for userId:", userId, "with body:", body);
        const validatedData = userValidation.validateUpdateProfile(body);
        const updatedData = await userServices.updateUserProfile(userId, validatedData);
        res.status(200).json({success:true,data:updatedData,message:"Profile updated successfully"});
    }
    catch(error){
        console.error("Error in updateUserProfile:",error);
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
}

module.exports = {getUserProfile, updateUserProfile};