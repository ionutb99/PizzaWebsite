const { json } = require("express");
const fs = require(`fs`);
const validateReq = require(`./validateOrderReqBody`);

const addNewOrder = (order, filepath) => {
  let obj = require(filepath);
  let error;
  let highestId = 0;

  if (obj.orders.length > 0) {
    highestId = obj.orders.reduce((accumlator, current) => {
      return accumlator > current ? accumlator : current;
    }).id;
  }

  highestId++;


  order.id = highestId;
  obj.orders.push(order);
  fs.writeFile(filepath, JSON.stringify(obj), (e) => {
    if (e) {
      console.log(e);
      return e;
    }
  });
};

module.exports = addNewOrder;
