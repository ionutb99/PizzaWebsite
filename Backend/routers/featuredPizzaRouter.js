const express = require(`express`);
const featuredPizzaRouter = express.Router();

const {featuredPizzaData} = require(`../data/featuredPizzaList`)

featuredPizzaRouter.get(`/featuredPizza`, (req, res) => {
  res.json({data: featuredPizzaData});
});

module.exports = featuredPizzaRouter;
