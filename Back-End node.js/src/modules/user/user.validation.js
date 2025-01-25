import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2 , tlds: {allow: ["com","net"]}}).required(),
    age: Joi.number().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/),
    cPassword: Joi.ref("password"),
    role: Joi.string().required()
})

const signInSchema = Joi.object({
    email: Joi.string().email({minDomainSegments: 2 , tlds: {allow: ["com","net"]}}).required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,10}$/)
})

export{
    signUpSchema,
    signInSchema
}
