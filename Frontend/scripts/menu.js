//import functions for the navbar(They are reused on every site)
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;

const fetchAllergens = async () => {
  const response = await fetch(`${LANDING_PAGE}api/allergen`);
  const data = await response.json();
  const res2 = await fetch(`${LANDING_PAGE}api/pizza`);
  const data2 = await res2.json();

  let createButton;

  const resetPizzaBttn = document.createElement("button");
  resetPizzaBttn.id = "resetPizza";
  resetPizzaBttn.textContent = "All Pizzas";
  const getDivButton = document.querySelector("#allergensDiv");
  getDivButton.appendChild(resetPizzaBttn);

  for (let i = 0; i < data.allergens.length; i++) {
    const element = data.allergens[i];

    createButton = document.createElement("button");
    createButton.id = `allergenButtons${i}`;
    createButton.classList = `${i + 1}`;
    createButton.textContent = element.name;

    // Append the button to the document body

    getDivButton.appendChild(createButton);
  }

  for (let i = 0; i < data.allergens.length; i++) {
    const button = document.querySelector(`#allergenButtons${i}`);
    button.addEventListener("click", (e) => {
      const textButton = e.target.innerText;
      const allergenDiv = document.querySelectorAll("#mainRoot > div");
      for (const allergen of allergenDiv) {
        const allAllergens = allergen.querySelector(".allAllergen");
        // console.log(allAllergens.innerText);
        allergen.classList.remove("hidden");
        if (!allAllergens.innerText.includes(textButton)) {
          // console.log(allAllergens.id +" include");
          allergen.classList.add("hidden");
        }
        resetPizzaBttn.addEventListener("click", () => {
          allergen.classList.remove("hidden");
        });
      }
    });
    // Use the button here or perform any desired operations
  }

  // TODO: Show all Button
};

const fetchAllPizzas = async () => {
  const response = await fetch(`${LANDING_PAGE}api/pizza`);
  const res2 = await fetch(`${LANDING_PAGE}api/allergen`);
  const data = await response.json();
  const data2 = await res2.json();

  for (let i = 0; i < data.pizzas.length; i++) {
    const ele = data.pizzas[i];
    pizzaDetails(ele, i, data2);
  }
};

const pizzaDetails = (element, index, data2) => {
  const getDivRoot = document.querySelector("#mainRoot");
  const createDivMenu = document.createElement("div");
  createDivMenu.id = `menu${index}`;
  createDivMenu.classList = "gridItem";

  const createImage = document.createElement("img");
  createImage.id = `image${index}`;
  const createPizzaName = document.createElement("h2");
  createPizzaName.id = `pizzaName${index}`;
  const createPizzaIngredients = document.createElement("p");
  createPizzaIngredients.id = `pizzaDetails${index}`;
  const createAllergens = document.createElement("div");
  createAllergens.id = `allergens${index}`;
  createAllergens.classList = "allAllergen";
  const createPrice = document.createElement("div");
  createPrice.id = `priceDiv${index}`;
  const createButtonOrder = document.createElement("button");
  createButtonOrder.id = `buttonOrder${index}`;

  // Create the quantity control container
  const quantityControl = document.createElement("div");
  quantityControl.className = `quantity-control${index}`;
  // Create the decrease button
  const decreaseButton = document.createElement("button");
  decreaseButton.className = `decrease-button${index}`;
  decreaseButton.textContent = "-";

  // Create the quantity input field
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = `quantity-input${index}`;
  quantityInput.value = "1";
  quantityInput.dataset.id = `1`;

  // Create the increase button
  const increaseButton = document.createElement("button");
  increaseButton.className = `increase-button${index}`;
  increaseButton.textContent = "+";

  getDivRoot.appendChild(createDivMenu);
  createDivMenu.appendChild(createImage);
  createDivMenu.appendChild(createPizzaName);
  createDivMenu.appendChild(createPizzaIngredients);
  createDivMenu.appendChild(createAllergens);
  createDivMenu.appendChild(createPrice);
  createDivMenu.appendChild(quantityControl);
  quantityControl.appendChild(decreaseButton);
  quantityControl.appendChild(quantityInput);
  quantityControl.appendChild(increaseButton);
  createDivMenu.appendChild(createButtonOrder);

  const getImage = document.querySelector(`#image${index}`);
  const getPizzaName = document.querySelector(`#pizzaName${index}`);
  const getPizzaDetails = document.querySelector(`#pizzaDetails${index}`);
  const getAllergens = document.querySelector(`#allergens${index}`);
  const getPrice = document.querySelector(`#priceDiv${index}`);
  const getButtonOrder = document.querySelector(`#buttonOrder${index}`);

  getImage.src = `../assets/images/pizza_${index}.png`;
  // getImage.style.margin = '-50px -20px -20px -20px';

  getPizzaName.innerText = element.name;
  getPizzaDetails.innerText = "Filling: " + element.ingredients;
  getAllergens.innerText = "";

  for (let i = 0; i < element.allergens.length; i++) {
    for (let j = 0; j < data2.allergens.length; j++) {
      if (data2.allergens[j].id == element.allergens[i]) {
        getAllergens.innerText += " * " + data2.allergens[j].name;
      }
    }
  }

  getPrice.innerText = element.price + " Ron";
  getButtonOrder.innerText = "Order";

  const getDecrease = document.querySelector(`.decrease-button${index}`);
  const getIncrease = document.querySelector(`.increase-button${index}`);
  const getQuantity = document.querySelector(`.quantity-input${index}`);

  getButtonOrder.addEventListener("click", () => {
    const cart = document.querySelector("#carth");
    resetInput();
  });
  getDecrease.addEventListener("click", decreaseQuantity);
  getIncrease.addEventListener("click", increaseQuantity);
  // Function to decrease the quantity
  function decreaseQuantity() {
    const currentValue = parseInt(getQuantity.value);
    if (currentValue > 1) {
      getQuantity.value = currentValue - 1;
    }
    getQuantity.dataset.id = currentValue - 1;
  }
  // Function to increase the quantity
  function increaseQuantity() {
    const currentValue = parseInt(getQuantity.value);
    getQuantity.value = currentValue + 1;
    getQuantity.dataset.id = currentValue + 1;
  }
  // Function resetInput
  function resetInput() {
    const cart = document.querySelector("#carth");
    if (cart.style.animation) {
      cart.style.animation = "";
    } else {
      cart.style.color = "orange";
      cart.style.animation = "shake 1s";
      cart.innerText = " 1";
    }
    quantityInput.value = "1";
    // cart.style.color = "orange";
    // cart.style.animation = "shake 3s";
  }
};

/**
 *
 * @param {event} e event target
 * @param {Array} cartItems Array of pizzas added to order
 */
const buttonFunction = async (e, cartItems) => {
  const response = await fetch(`${LANDING_PAGE}api/pizza`);
  const data = await response.json();
  let id;
  if (e.target.parentElement.id.length < 6) {
    id = e.target.parentElement.id[e.target.parentElement.id.length - 1];
  } else {
    id = e.target.parentElement.id.substring(
      e.target.parentElement.id.length - 2,
      e.target.parentElement.id.length
    );
  }
  console.log();
  const pizzaObj = {
    id: data.pizzas[id].id,
    amount: e.target.parentElement.querySelector(`.quantity-input${id}`).dataset
      .id,
  };
  cartItems.push(pizzaObj);
  sessionStorage.setItem(`pizzas`, JSON.stringify(cartItems));
};

const cartItemsHelperFunction = () => {
  if(sessionStorage.pizzas === undefined) {
    return [];
  } else {
    return JSON.parse(sessionStorage.pizzas)
  }
}

const main = async () => {
  navbar(LANDING_PAGE, rootElement);
  AddNavbarUnderline(checkActivePage());
  const createDivButton = document.createElement("div");
  createDivButton.id = "allergensDiv";
  rootElement.insertAdjacentElement("beforeend", createDivButton);
  const createMainRoot = document.createElement("div");
  createMainRoot.id = "mainRoot";
  rootElement.insertAdjacentElement("beforeend", createMainRoot);
  const allergensList = await fetchAllergens();
  const pizzaMenu = await fetchAllPizzas();

  document.querySelector(`#carth`).addEventListener(`click`, (e) => {
    window.location.href = `${LANDING_PAGE}cart`;
  });


  document
    .querySelectorAll(`#mainRoot > .gridItem > button`)
    .forEach((button) =>
      button.addEventListener(`click`,async (e) => {
        buttonFunction(e, await cartItemsHelperFunction());
      })
    );
};

main();
