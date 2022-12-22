const mongoose = require("mongoose");

const Pokemon = mongoose.Schema({
    name: {type: String, required: true},
    pokemon_id: {type: String, required: true},
},
{
    timestamps: true
});

module.exports = mongoose.model("pokemon", Pokemon);