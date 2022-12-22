const jwt = require("jsonwebtoken");
const config = require("./secret");

module.exports =  async(req,res)=>{
    const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "O token de autenticação não existe!"
            });
        }
        const [bearer, token] = auth.split(' ');
        return jwt.verify(token, config.secret,function (err, decoded) {
            if (err) {
                return res.status(500).json({
                    error: true,
                    code: 130,
                    message: "Erro!"
                });
            }
            
            return decoded
        })

}