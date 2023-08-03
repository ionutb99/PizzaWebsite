//import functions for the navbar(They are reused on every site)
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;

const fetchPizza = async () => {
    const response = await fetch(`${LANDING_PAGE}api/pizza`)
    const data = await response.json();

    return data;
}

const fetchAllergens = async () => {
    const response = await fetch(`${LANDING_PAGE}api/allergen`);
    const data = await response.json();


    for (let i = 0; i < data.allergens.length; i++) {
        const ele = data.allergens[i];
        createButtonsAllergens(ele, i);
    }
}

const createButtonsAllergens = (element, index) => {

    // Create a button element
    const createMotherDiv = document.createElement('div');
    createMotherDiv.classList = "momtherDiv";
    const createImage = document.createElement('img');
    createImage.id = `image${index}`;
    let createDiv = document.createElement('div');
    createDiv.id = `allergenButtons${index}`;
    createDiv.textContent = element.id + " (" + element.name + ")";
    
    const getDivButton = document.querySelector("#allergensDiv");
    // Append the button to the document body

    
    getDivButton.appendChild(createMotherDiv);
    createMotherDiv.appendChild(createImage);
    createMotherDiv.appendChild(createDiv);

    const getImage = document.querySelector(`#image${index}`);
    getImage.src = `../assets/images/allergenButtons_${index}.png`;

}

// const showAllergens = (elem) => {
//     const getList = document.querySelector("#listAll");
//     const getDiv = document.querySelector("#principalDiv");
//     rootElement.appendChild(getDiv);
//     getDiv.appendChild(getList);

//     getList.innerHTML += `<li id=li${elem.id}>${elem.id} : (${elem.name})</li>`; 
// }


const main = async () => {
    navbar(LANDING_PAGE,rootElement);
    AddNavbarUnderline(checkActivePage());
    // const createDiv = document.createElement("div");
    // createDiv.id = "principalDiv";
    // rootElement.insertAdjacentElement('beforeend',createDiv);
    // const createList = document.createElement('ul');
    // createList.id = "listAll";
    // createDiv.insertAdjacentElement('beforeend',createList);
    const createDivButton = document.createElement("div");
    createDivButton.id = "allergensDiv";
    rootElement.insertAdjacentElement("beforeend",createDivButton);
    const pizzaList = await fetchPizza();
    const allergensList = await fetchAllergens();

    console.log(allergensList);
    document.querySelector(`#carth`).addEventListener(`click`, (e) => {
        window.location.href = `${LANDING_PAGE}cart`;
      });
}

main();