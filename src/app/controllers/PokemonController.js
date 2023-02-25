const Pokemon = require("../models/Pokemon");
const yup = require('yup');
const { default: axios } = require("axios");

class PokemonController{
    
    async storePokemon(req, res){
        //Validacao com YUP schema dos dados a ser inseridos na base de dados
        let schema = yup.object().shape({
            name: yup.string().required(),    
            pokemonId: yup.string().required(),
            //user:  yup.string().required(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                    message: "Dados inválidos!"
            })
        }
        const userId = req.userId;
        console.log(userId);
        const {name, pokemonId} = req.body;
        const data = {name,pokemonId}
        
        //Inserir dados na collection
        await Pokemon.create({...data,user: userId}, (err)=>{
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar cadastrar pokemon!"+err
                });
            }
            return res.status(200).json({
                error: false,
                message: "Pokemon casdastrado com sucesso!"
            });
        })
    }

    async getPokemon(req, res){
        let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1'
        /*const next = null
        const previous = null*/
        if (req.body.next != null) {
            url = req.body.next;
        }
        if (req.body.previous != null) {
            url = req.body.previous;
        }
        const data = await axios
        .get(url, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })
        .then(function(response){
            return (response.data);
        })
        .catch(function (error) {
            console.error(error);
        })

        const dataUrl = data.results[0].url
        console.log(dataUrl);
        console.log(data.results);

        const dataPokemon =  await axios
        .get(dataUrl, { 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })
        .then(function(response){
            return (response.data);
        })
        .catch(function (error) {
            console.error(error);
        })
        
        //console.log(url2);
        res.status(200).json({
            error: false,
            name: data.results[0].name,
            next: data.next,
            previous: data.previous,
            //url,
            dataPokemon: dataPokemon
        });
    }

    async myPokemons(req, res){
        //console.log(req.user_id);
        const pokemons = await Pokemon.find().populate('user');
        if (!pokemons) {
            return res.status(400).json({
                error: true,
                    message: "Não tens pokemons!"
            })
        }

        return res.status(200).json({
            error: false,
            pokemons: pokemons
        })
    }

}

module.exports = new PokemonController();