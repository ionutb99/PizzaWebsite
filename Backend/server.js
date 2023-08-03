//Requiring express
const express = require(`express`);
const app = express();
//Tell express that we're using the files in the Frontend folder as static files
app.use(express.static(`./Frontend`));
app.use(express.json());



//Our home page router
app.get(`/`, (req, res) => {
  res.sendFile(`index.html`, { root: `./Frontend/views` });
});
app.get(`/menu`, (req, res) => {
  res.sendFile(`menu.html`, { root: `./Frontend/views` });
});
app.get(`/allergens`, (req, res) => {
  res.sendFile(`allergens.html`, { root: `./Frontend/views` });
  //  res.redirect("http://localhost:3000/api/pizza");
});
app.get(`/story`, (req, res) => {
  res.sendFile(`story.html`, { root: `./Frontend/views` });
});
app.get(`/contact`, (req, res) => {
  res.sendFile(`contact.html`, { root: `./Frontend/views` });
});
app.get(`/cart`, (req, res) => {
  res.sendFile(`cart.html`, { root: `./Frontend/views` });
 
});




//A helper route to pass the featuredPizzas data from the server to the client
const featuredPizzaRouter = require("./routers/featuredPizzaRouter");
const pizzaRouter = require(`./routers/pizzaRouter`);
const allergensRouter = require(`./routers/allergensRouter`);
const ordersRouter = require(`./routers/order`);
app.use(`/api`, featuredPizzaRouter);
app.use(`/api`, pizzaRouter);
app.use(`/api`, allergensRouter);
app.use(`/api`, ordersRouter);


console.log(`http://localhost:3000/`);
app.listen(3000);
