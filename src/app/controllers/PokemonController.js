const Pokemon = require("../models/Pokemon");
const yup = require('yup');

class PokemonController{

    async storePokemon(req, res){
        //Validacao com YUP schema dos dados a ser inseridos na base de dados
        let schema = yup.object().shape({
            name: yup.string().required(),    
            pokemon_id: yup.string().required(),    
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                    message: "Dados inválidos!"
            })
        }
        
        const {name, pokemon_id} = req.body;
        const data = {name,pokemon_id}
        
        //Inserir dados na collection
        await Pokemon.create(data, (err)=>{
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro ao tentar cadastrar pokemon!"
                });
            }
            return res.status(200).json({
                error: false,
                message: "Pokemon casdastrado com sucesso!"
            });
        })
    }

    async getPokemons(req, res){
        //console.log(req.user_id);
        const pokemons = await Pokemon.find();
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