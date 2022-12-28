const { Router } = require("express");
const routes = new Router();

const AuthMiddleware = require("./app/middlewares/authMiddleware");
const UserController = require("./app/controllers/UserController");
const LoginController = require("./app/controllers/LoginController");
const PokemonController = require("./app/controllers/PokemonController");


//Rotas e parametros
routes.get('/index', UserController.index);
routes.post('/insertUser', UserController.store);
routes.post('/login', LoginController.index);
routes.post('/insertPokemon', AuthMiddleware, PokemonController.storePokemon);
routes.get('/users', AuthMiddleware, UserController.show);
routes.get('/myPokemons', AuthMiddleware, PokemonController.myPokemons);
routes.get('/getPokemon', AuthMiddleware, PokemonController.getPokemon);


//------
/*routes.get('/ola/:nome/:idade', (req, res)=> {
    res.send("<h1>Nome: "+req.params.nome+"</h1><br/><h1>Idade: "+req.params.idade+"</h1>");
});*/

module.exports = routes;