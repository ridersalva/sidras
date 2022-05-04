const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const TeamMemberSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            default: "link"//mirar como asociar fotos sacadas con la camara 
        },
        sidras: {
            type: Number,
        },
        culines: {
            type: Number,
        },
        sidrasDate: {
            type: Date
        },
        owner: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        playerColor: String
    },

    {
        timestamps: true,
    }
)
const TeamMember = model("TeamMember", teamMemberSchema);

module.exports = TeamMember