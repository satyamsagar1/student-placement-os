const User = require('./user.model');

const getUserProfile =async(userId)=>{

    const user = await User.findById(userId).select('-passwordHash');

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        collegeName: user.collegeName,
        degree: user.degree,
        branch: user.branch,
        graduationYear: user.graduationYear,
        targetRole: user.targetRole,
        skills: user.skills,
        yearsOfExperience: user.yearsOfExperience,
        linkedinUrl: user.linkedinUrl,
        githubUrl: user.githubUrl
    }
}

const updateUserProfile =async(userId,body)=>{

    const user = await User.findById(userId).select('-passwordHash');
    console.log("Updating user profile for userId:", userId, "with data:", body);   

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    user.name = body.name ?? user.name;
    user.collegeName = body.collegeName ?? user.collegeName;
    user.degree = body.degree ?? user.degree;
    user.branch = body.branch ?? user.branch;
    user.graduationYear = body.graduationYear ?? user.graduationYear;
    user.targetRole = body.targetRole ?? user.targetRole;
    user.skills = body.skills ?? user.skills;
    user.yearsOfExperience = body.yearsOfExperience ?? user.yearsOfExperience;
    user.linkedinUrl = body.linkedinUrl ?? user.linkedinUrl;
    user.githubUrl = body.githubUrl ?? user.githubUrl;

    await user.save();
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        collegeName: user.collegeName,
        degree: user.degree,
        branch: user.branch,
        graduationYear: user.graduationYear,
        targetRole: user.targetRole,
        skills: user.skills,
        yearsOfExperience: user.yearsOfExperience,
        linkedinUrl: user.linkedinUrl,
        githubUrl: user.githubUrl
    };
}

module.exports = {getUserProfile, updateUserProfile};