const User = require("../models/User");
const bcrypt = require("bcryptjs");
const yup = require('yup');
const config = require("../../config/secret");
const jwt = require("jsonwebtoken");
const auth3 = require("../../config/auth");
const { default: axios } = require("axios");


class UserController{
    
    index(req, res){
        res.status(200).json({
            error: false,
            info: req.body
        });
        //console.log();
    }

    async show(req, res){
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "O token de autenticação não existe!"
            });
        }
        const [bearer, token] = auth.split(' ');

        console.log(token);
        const auth2 = await jwt.verify(token, config.secret,function (err, decoded) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    code: 130,
                    message: "Erro!"
                });
            }
            
            return decoded;
        })
        console.log(req.userId);
        console.log(auth2);
        console.log(await auth3(req,res));
        
        //console.log(decoded);
        var users = ["Rogério", "Fernando", "Ana"];
        res.status(200).json({
            error: false,
            users
        });
    }
    
    async store(req, res){
        //Validacao com YUP schema dos dados a ser inseridos na base de dados
        let schema = yup.object().shape({
            name: yup.string().required(),    
            email: yup.string().email().required(),    
            password: yup.string().required(),    
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                    message: "Dados inválidos!"
            })
        }
        
        let userExist = await User.findOne({email: req.body.email});
        if((userExist)){
            return res.status(400).json({
                error: true,
                    message: "Erro ao inserir o usuario. Este usuario já existe!"
            })
        }
        const {name, email, password} = req.body;
        const data = {name,email,password}

        //Criptografando a password
        data.password = await bcrypt.hash(data.password, 8);
        
        //Inserir dados na collection
        await User.create(data, (err)=>{
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar inserir usuario!"
                });
            }
            return res.status(200).json({
                error: false,
                message: "Usuario casdastrado com sucesso!"
            });
        })
    }

}

module.exports = new UserController();