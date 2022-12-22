const mongoose = require("mongoose");

class Connection{
    constructor(){
        this.dataBaseConnectionMongoDB();
    }
    dataBaseConnectionMongoDB(){
        this.mongooseConection = mongoose.connect("mongodb://127.0.0.1:27017/nodejs_api", {
            //useMongoClient: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        })
        .then(()=>{
            console.log("Conexão estabelecida com sucesso!");
        })
        .catch((error)=>{
            console.log("Falha na conexão: "+error);
        });
    }
}

exports = new Connection();