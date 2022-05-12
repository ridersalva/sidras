const express = require("express")
const router = require("express").Router();
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const TeamMember = require("../models/Team.model")

//Vista Equipo

router.get('/teamView', isAuthenticated, (req, res, next) => {
    TeamMember
        .find({ owner: req.payload._id })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

//Crear Juagador

router.post("/create", isAuthenticated, (req, res, next) => {
    TeamMember

})