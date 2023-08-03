//import functions for the navbar(They are reused on every site)
// import { json } from "express";
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;

const fetchPizza = async () => {
  const response = await fetch(`${LANDING_PAGE}api/pizza`);
  const data = await response.json();

  return data;
};

const fetchAllergens = async () => {
  const response = await fetch(`${LANDING_PAGE}api/allergen`);
  const data = await response.json();

  return data;
};
/**
 *
 * @param {object} pizza
 * @param {Array} pizzaList
 * @param {HTMLElement} container
 * For each element from the pizzaList creates a cartItem
 */
const createElement = (pizza, pizzaList, container) => {
  const result = pizzaList.filter((element) => pizza.id === element.id);

  const cartItem = document.createElement(`div`);
  cartItem.classList.add(`cartItem`);
  cartItem.dataset.id = pizza.id;

  //Create the image element for each pizza
  const imageContainer = document.createElement(`div`);
  imageContainer.classList.add(`pizzaImage`);
  const pizzaImage = document.createElement(`img`);
  console.log(result[0].id);
  pizzaImage.src = `../assets/images/pizza_${result[0].id}.png`;

  //create the div holding details about the pizza
  const details = document.createElement(`div`);
  details.classList.add(`pizzaDetails`);

  const pizzaName = document.createElement(`h2`);
  pizzaName.classList.add(`pizzaName`);
  pizzaName.innerText = result[0].name;

  const ingredients = document.createElement(`h2`);
  ingredients.classList.add(`ingredients`);
  ingredients.innerHTML = result[0].ingredients;

  //create an element showing the quantity of pizzas added to the cart, increment and decrement buttons
  const quantity = document.createElement(`div`);
  quantity.classList.add(`quantity-control`);
  const decreaseButton = document.createElement(`button`);
  decreaseButton.classList.add(`decrease-button`);
  decreaseButton.innerText = `-`;
  const increaseButton = document.createElement(`button`);
  increaseButton.classList.add(`increase-button`);
  increaseButton.innerText = `+`;
  const inputElement = document.createElement(`input`);
  inputElement.classList.add(`quantity-input`);
  inputElement.type = `number`;
  inputElement.value = pizza.amount;
  inputElement.dataset.value = pizza.amount;

  console.log(pizza);

  quantity.append(increaseButton, inputElement, decreaseButton);
  details.appendChild(pizzaName);
  details.appendChild(ingredients);
  imageContainer.appendChild(pizzaImage);
  cartItem.appendChild(imageContainer);
  cartItem.appendChild(details);
  cartItem.appendChild(quantity);

  container.appendChild(cartItem);
};

/**
 *
 * @param {Array} pizzaList
 * Creates the cart site html structure
 */
const createCart = (pizzaList) => {
  const rootElement = document.querySelector(`#root`);
  const pizzas = [];

  if(sessionStorage.pizzas === undefined) {
    const message = document.createElement(`h1`);
    message.innerText = `Your cart is empty`;
    rootElement.appendChild(message);
    return;
  }

  const fragment = document.createDocumentFragment();

  const container = document.createElement(`div`);
  
  container.classList.add(`container`);


  JSON.parse(sessionStorage.pizzas).forEach((pizza) => {
    pizzas.push(createElement(pizza, pizzaList, container));
  });

  

  const container2 = document.createElement(`div`);
  container2.classList.add(`container`);

  const formElement = document.createElement(`form`);
  formElement.id = `clientDetails`;

  const inputFieldName = document.createElement(`input`);
  inputFieldName.type = `text`;
  inputFieldName.placeholder = `Please enter your name!`;
  inputFieldName.classList.add(`clientName`);

  const inputFieldEmail = document.createElement(`input`);
  inputFieldEmail.type = `email`;
  inputFieldEmail.placeholder = `Please enter your email adress!`;
  inputFieldEmail.classList.add(`clientEmail`);

  const inputFieldCity = document.createElement(`input`);
  inputFieldCity.type = `text`;
  inputFieldCity.placeholder = `Please enter the city name!`;
  inputFieldCity.classList.add(`clientCity`);

  const inputFieldStreet = document.createElement(`input`);
  inputFieldStreet.type = `text`;
  inputFieldStreet.placeholder = `Please enter the street name and number!`;
  inputFieldStreet.classList.add(`clientStreet`);

  const submitButton = document.createElement(`button`);
  submitButton.id = `submitButton`;
  submitButton.type = `submit`;
  submitButton.innerText = `Submint Order`;

  formElement.append(
    inputFieldName,
    inputFieldEmail,
    inputFieldCity,
    inputFieldStreet
  );
  container2.append(formElement, submitButton);

  fragment.appendChild(container);
  rootElement.appendChild(fragment);
  rootElement.appendChild(container2);
};

/**
 *
 * @param {Event} e
 * Sends a post request to the server with the orders and client information
 */
const submitForm = (e) => {
  const clientName = e.target.parentElement.querySelector(`.clientName`).value;
  const clientEmail =
    e.target.parentElement.querySelector(`.clientEmail`).value;
  const clientCity = e.target.parentElement.querySelector(`.clientCity`).value;
  const clientStreet =
    e.target.parentElement.querySelector(`.clientStreet`).value;

  const currentDate = new Date();

  //Object constructed to be sent to the api
  const postObj = {
    id: 1,
    pizzas: [JSON.parse(sessionStorage.pizzas)],
    date: {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hour: currentDate.getHours(),
      minute: currentDate.getMinutes(),
    },
    customer: {
      name: clientName,
      email: clientEmail,
      address: {
        city: clientCity,
        street: clientStreet,
      },
    },
  };

  console.log(postObj);

  if(clientName.length < 1 || clientEmail.length < 1 || clientCity.length < 1 || clientStreet.length < 1) {
    alert(`Please complete the form to be able to order`)
  } else {
    fetch(`http://localhost:3000/api/order`, {
    method: `POST`,
    body: JSON.stringify(postObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  // clear inputs after
  e.target.parentElement.querySelector(`.clientName`).value = "";
  e.target.parentElement.querySelector(`.clientEmail`).value = "";
  e.target.parentElement.querySelector(`.clientCity`).value = "";
  e.target.parentElement.querySelector(`.clientStreet`).value = "";

  const getCartItem = document.querySelectorAll('.cartItem');
  getCartItem.forEach((e) => {e.remove();})

  const getContainer = document.querySelectorAll('.container');
  getContainer.forEach((e) => {e.remove();})

  const getRoot = document.querySelector('#root');
  const thankYou = document.createElement('h1');
  thankYou.id = "thankYou";
  thankYou.innerText = "Thank you for your order!";
  
  getRoot.appendChild(thankYou);
  sessionStorage.clear();
  }

  

  
};
/**
 *
 * @param {Event} e
 * Increment the input fields value and update the localStorage
 */
const incrementButton = async (e) => {
  const inputElement = e.target.parentElement.querySelector(`input`);
  const currentValue = inputElement.value;
  inputElement.value = parseInt(currentValue) + 1;
  inputElement.dataset.value = parseInt(currentValue) + 1;

  const pizzaList = await JSON.parse(sessionStorage.pizzas);

  for (const pizza of pizzaList) {
    if (
      parseInt(pizza.id) ===
      parseInt(e.target.parentElement.parentElement.dataset.id)
    ) {
      pizza.amount = parseInt(currentValue) + 1;
    }
  }

  sessionStorage.clear();
  sessionStorage.setItem(`pizzas`, await JSON.stringify(pizzaList));
};

/**
 *
 * @param {Event} e event element
 * Decrement the input element value and update the localStorage
 */
const decrementButton = async (e) => {
  const inputElement = e.target.parentElement.querySelector(`input`);
  const currentValue = inputElement.value;
  if (inputElement.value > 1) {
    inputElement.value = parseInt(currentValue) - 1;
    inputElement.dataset.it = parseInt(currentValue) - 1;
  } else {
    e.target.parentElement.parentElement.remove();
  }

  const pizzaList = await JSON.parse(sessionStorage.pizzas);

  for (const pizza of pizzaList) {
    if (
      parseInt(pizza.id) ===
      parseInt(e.target.parentElement.parentElement.dataset.id)
    ) {
      pizza.amount = parseInt(currentValue) - 1;
    }
  }

  if (pizzaList.findIndex((element) => parseInt(element.amount) === 0) != -1) {
    pizzaList.splice(
      pizzaList.findIndex((element) => parseInt(element.amount) === 0),
      1
    );
  }

  sessionStorage.clear();
  sessionStorage.setItem(`pizzas`, await JSON.stringify(pizzaList));
};

const main = async () => {
  navbar(LANDING_PAGE, rootElement);
  AddNavbarUnderline(checkActivePage());
  const pizzaList = await fetchPizza();
  const allergensList = await fetchAllergens();

  createCart(pizzaList.pizzas);
  document
    .querySelector(`#submitButton`)
    .addEventListener(`click`, (e) => submitForm(e));

  document
    .querySelectorAll(`.increase-button`)
    .forEach((button) =>
      button.addEventListener(`click`, (e) => incrementButton(e))
    );
  document
    .querySelectorAll(`.decrease-button`)
    .forEach((button) =>
      button.addEventListener(`click`, (e) => decrementButton(e))
    );
};

main();
