const express = require(`express`);
const allergensRouter = express.Router();

allergensRouter.get(`/allergen`, (req, res) => {
    res.sendFile(`allergens.json`, {root: `./Backend/data`});
})

module.exports = allergensRouter;