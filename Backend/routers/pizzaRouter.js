const express = require(`express`);
const pizzaRouter = express.Router();
const fs = require(`fs`)



pizzaRouter.get(`/pizza`, (req, res) => {
    res.sendFile(`pizza.json`, {root: `./Backend/data`});
})

pizzaRouter.get(`/pizza/list`, (req, res) => {
    res.sendFile(`pizza.json`, {root: `./Backend/data`});
})

module.exports = pizzaRouter;