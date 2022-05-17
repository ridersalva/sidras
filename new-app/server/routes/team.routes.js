const express = require("express")
const router = require("express").Router();
const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const TeamMember = require("../models/Team.model");
const { json } = require("express");

//Vista Equipo

router.get('/teamView', isAuthenticated, (req, res, next) => {
    TeamMember
        .find({ owner: req.payload._id })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

//Crear Juagador

router.post('/create', isAuthenticated, (req, res, next) => {
    TeamMember
        .create(req.body)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))

})

//Seleccionar uno 

router.get(`/:teamMember_id`, (req, res) => {
    const { teamMember_id } = req.params
    TeamMember
        .findById(teamMember_id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

//Editar uno

router.put('/:teamMember_id', isAuthenticated, (req, res) => {
    const { teamMember_id } = req.params
    TeamMember
        .findByIdAndUpdate(teamMember_id, { ...req.body }, { new: true })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
})