const express = require(`express`);
const router = express.Router();
const fs = require(`fs`);
const addNewOrder = require(`../addNewOrder`);
const filePath = require(`../filePathModule`);

router.get(`/order`, (req, res) => {
    res.sendFile(`orders.json`, {root: `./Backend/data`})
})

router.post(`/order`, (req, res) => {
    addNewOrder(req.body, `${filePath}/data/orders.json`)
    res.send(`Test`);
})

module.exports = router;