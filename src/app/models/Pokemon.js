const mongoose = require("mongoose");

const Pokemon = mongoose.Schema({
    name: {type: String, require: true},
    pokemonId: {type: String, require: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("pokemon", Pokemon);