//import functions for the navbar(They are reused on every site)
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;

/**
 * Adds the image to the landing page
 */
const addImage = () => {
  //create a fragment and an image element
  let fragment = document.createDocumentFragment();
  let image = document.createElement(`img`);
  image.id = `pizzaImage`;
  //set the src to the image from the assets
  image.src = `../assets/images/PizzaInHand-removebg-preview.png`;
  //append the image to the fragment and the rootelement
  fragment.appendChild(image);
  rootElement.appendChild(fragment);
};

/**
 * Fetch the featured pizzas array from the featuredPizza helper route
 * @returns an array containing the list of the featured pizzas
 */
const fetchFeaturedPizzas = async () => {
  const response = await fetch(`${LANDING_PAGE}api/featuredPizza`);
  const data = await response.json();
  return data;
};

/**
 * Displays the first featured pizza and two arrows(right and left)
 * @param {Object} featuredPizzasObject Object returned by the fetchFeaturedPizzas function
 */
const listFeaturedPizza = (featuredPizzasObject) => {
  //Create a fragment, a container for the elements and containers for the arrows(arrows are i elements)
  let featuredPizzas = featuredPizzasObject.data;
  const fragment = document.createDocumentFragment();
  const container = document.createElement(`div`);
  const pizzaNameElement = document.createElement(`p`);
  const leftArrow = document.createElement(`i`);
  const leftArrowContainer = document.createElement(`div`);
  const rightArrow = document.createElement(`i`);
  const rightArrowContainer = document.createElement(`div`);

  //Set the id and class of the elements
  container.id = `featuredPizza`;
  leftArrow.id = `leftArrow`;
  leftArrow.classList.add(`fa`);
  leftArrow.classList.add(`fa-arrow-circle-left`);
  leftArrow.id = `leftArrow`;
  rightArrow.classList.add(`fa`);
  rightArrow.classList.add(`fa-arrow-circle-right`);
  rightArrow.id = `rightArrow`;

  //Make the pizzaName equal to the first featured pizza
  pizzaNameElement.innerText = featuredPizzas[0];

  //Append all the elements to their correspondin container then the main container then the fragment then the root element
  leftArrowContainer.appendChild(leftArrow);
  rightArrowContainer.appendChild(rightArrow);
  container.appendChild(leftArrowContainer);
  container.appendChild(pizzaNameElement);
  container.appendChild(rightArrowContainer);
  fragment.appendChild(container);
  rootElement.appendChild(fragment);
};

/**
 * cycles between the featured pizzas when pressing either arrow
 * @param {string} direction Direction of the arrow
 * @param {Array} listOfPizzas List of pizzas
 * @returns -1 if something went wrong
 */
const cycleFavoritePizzas = (direction, listOfPizzas) => {
  const currentPizza = document.querySelector(`#featuredPizza > p`);
  console.log(listOfPizzas.data.indexOf(currentPizza.innerText));
  let index = listOfPizzas.data.indexOf(currentPizza.innerText);
  if (direction === `left`) {
    if (index <= 0) {
      index = listOfPizzas.data.length - 1;
    } else {
      --index;
    }
  } else if (direction === `right`) {
    if (index >= 2) {
      index = 0;
    } else {
      ++index;
    }
  } else {
    return -1;
  }

  currentPizza.innerText = listOfPizzas.data[index];
};

/**
 * Add event listeners to the elements
 */
const eventListeners = (listOfPizzas) => {
  //Add evenet listener to the left arrow
  document
    .querySelector(`#featuredPizza > div > #leftArrow`)
    .addEventListener(`click`, (e) => {
      console.log(`Left arrow clicked`);
      cycleFavoritePizzas(`left`, listOfPizzas);
    });
  //Add event listener to the right arrow
  document
    .querySelector(`#featuredPizza > div > #rightArrow`)
    .addEventListener(`click`, (e) => {
      cycleFavoritePizzas(`right`, listOfPizzas);
    });
  //Add event listener to the cart icon
  document.querySelector(`#navbar > i`).addEventListener(`click`, (e) => {
    window.location.href = `${LANDING_PAGE}cart`;
  });
};

/**
 * main function to call the sub functions
 */
const main = async () => {
  navbar(LANDING_PAGE, rootElement);
  addImage();
  const featuerdPizzas = await fetchFeaturedPizzas();
  listFeaturedPizza(featuerdPizzas);
  AddNavbarUnderline(checkActivePage());
  eventListeners(featuerdPizzas);
};

main();
