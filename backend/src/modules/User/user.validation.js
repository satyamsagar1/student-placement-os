const joi = require('joi');

const updateProfileSchema = joi.object({
    name: joi.string().trim().min(2).max(50),
    collegeName: joi.string().trim().allow(null, '').optional(),
    degree: joi.string().trim().allow(null, '').optional(),
    branch: joi.string().trim().allow(null, '').optional(),
    graduationYear: joi.number().integer().min(2000).max(2100),
    targetRole: joi.string().trim().allow(null, '').optional(),
    skills: joi.array().items(joi.string().trim()).allow(null).optional(),
    yearsOfExperience: joi.number().integer().min(0).max(50),
    linkedinUrl: joi.string().uri().allow(null, '').optional(),
    githubUrl: joi.string().uri().allow(null, '').optional()

});

const validateUpdateProfile = (body)=>{
    const {error, value} = updateProfileSchema.validate(body,{
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true
    })
    if(error){
        const newError = new Error(error.details.map(detail => detail.message).join(', '));
        newError.statusCode = 400;
        throw newError;
    }
    return value;
}

module.exports = { validateUpdateProfile};