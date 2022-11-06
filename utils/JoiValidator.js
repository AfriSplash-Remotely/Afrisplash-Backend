class JoiValidator{
    static loginValidator = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    })
    }