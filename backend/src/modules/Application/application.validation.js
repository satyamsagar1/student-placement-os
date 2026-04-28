const joi = require('joi');

const createApplicationSchema = joi.object({
    companyName: joi.string().trim().min(2).max(100).required(),
    role: joi.string().trim().min(2).max(100).required(),
    status: joi.string().valid('Applied', 'OA', 'Interview', 'HR', 'Rejected', 'Offer', 'Ghosted', 'Withdrawn').optional(),
    jobLink: joi.string().uri().allow("").optional(),
    location: joi.string().trim().optional(),
    workMode: joi.string().valid('Remote', 'On-site', 'Hybrid').optional(),
    salary: joi.number().min(0).optional(),
    appliedDate: joi.date().optional(),
    notes: joi.string().trim().allow("").optional(),
    source: joi.string().trim().valid('LinkedIn', 'Company Website', 'Referral', 'Job Board', 'Other').optional(),
    nextActionDate: joi.date().optional()

});

const upateApplicationSchema = joi.object({
    companyName: joi.string().trim().min(2).max(100).optional(),
    role: joi.string().trim().min(2).max(100).optional(),   
    status: joi.string().valid('Applied', 'OA', 'Interview', 'HR', 'Rejected', 'Offer', 'Ghosted', 'Withdrawn').optional(),
    jobLink: joi.string().uri().allow("").optional(),
    location: joi.string().trim().optional(),
    workMode: joi.string().valid('Remote', 'On-site', 'Hybrid').optional(),
    salary: joi.number().min(0).optional(),
    appliedDate: joi.date().optional(),
    notes: joi.string().trim().allow("").optional(),
    source: joi.string().trim().valid('LinkedIn', 'Company Website', 'Referral', 'Job Board', 'Other').optional(),
    nextActionDate: joi.date().optional()
});

const statusValidator = joi.string().valid('Applied', 'OA', 'Interview', 'HR', 'Rejected', 'Offer', 'Ghosted', 'Withdrawn').required();

const validateCreateApplication = (body)=>{
    const {error, value} = createApplicationSchema.validate(body,{
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

const validateUpdateApplication = (body)=>{
    const {error, value} = upateApplicationSchema.validate(body,{
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


const validateStatus = (status) => {
  const { error, value } = statusValidator.validate(status);

  if (error) {
    const newError = new Error(error.details[0].message);
    newError.statusCode = 400;
    throw newError;
  }

  return value;
};

module.exports = { validateCreateApplication, validateUpdateApplication, validateStatus };