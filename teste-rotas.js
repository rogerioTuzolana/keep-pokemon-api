const express = require("express");
const app = express();
const port = 8081;

//Rotas
app.get('/', (req, res)=> {
    res.send("Seja bem vindo!!!");
});

app.get('/sobre', (req, res)=> {
    res.send("Sobre minha página");
});
app.get('/servicos', (req, res)=> {
    res.send("Serviços minha página");
});
app.listen(port, ()=>{
    console.log("Servidor rodando na url http://localhost:"+port);
});
