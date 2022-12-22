const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config/secret");

class LoginController{
    
    async index(req, res){
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
        //Verifica se o email existe na collection ou tabela
        if (!userExist) {
            return res.status(400).json({
                error: true,
                    message: "Usuario não existe!"
            })
        }
        //Verifica se a senha inserida é igual com a senha guardada
        if(!(await bcrypt.compare(password, userExist.password))){
            return res.status(400).json({
                error: true,
                    message: "Senha inválida!"
            })
        }
        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign(
                {id: userExist._id}, 
                config.secret,
                {expiresIn: config.expireIn}
            )
        })
    }
    
}

module.exports = new LoginController();