//import functions for the navbar(They are reused on every site)
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;

const createDivExtra = document.createElement('div');
createDivExtra.id = "secondDiv";
const createLogo = document.createElement('img');
createLogo.id = "logo";
createLogo.src = '../assets/images/bass-removebg-preview.png';


const addElement = (tag, inner, id) => {

 
    return `<${tag} id=${id}> ${inner} </${tag}>`;
  }


function createInputElement(type, placeholder) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    return input;
  }

  
  function createContactForm() {
    const form = document.createElement("form");
    form.id = 'myForm';

    const h2Text = document.createElement('h2');
    h2Text.id = 'h2';
    h2Text.textContent = 'Feedback!';
  
    const emailInput = createInputElement("email", "Email");
    emailInput.id = "emailInput";
    const textArea = document.createElement('textarea');
    textArea.id = "textArea";
  
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.id = "submitBttn";

    const inputElem = document.createElement('input');
    inputElem.type = 'file';
    inputElem.id = 'file';


    form.appendChild(h2Text);
    form.appendChild(emailInput);
    form.appendChild(textArea);
    form.appendChild(inputElem);
    form.appendChild(submitButton);


  
    form.addEventListener("submit", handleSubmit);
  
    return form;
  }
  let count = 0;

  function handleSubmit(event) {
    event.preventDefault();

    const getEmail = document.querySelector("inputEmail");
    const getTextarea = document.querySelector("textArea");
    console.log(emailInput.value);
    if (getTextarea.value == "" ) {
      getTextarea.placeholder = "You need to fill this out!"
    }

    if (emailInput.value == "" ) {
      emailInput.placeholder = "You need to fill this out!"
    }

    if (count == 0 && getTextarea.value !== "" && emailInput.value !== "") {
    rootElement.insertAdjacentHTML('beforeend',addElement('h3',"Thanks for your message!","h3Element"));
    count++;
    const h3 = document.querySelector('#h3Element');
    setTimeout(function() {
        h3.remove();
        count = 0;
    }, 2500)
  }else if(count > 0){
    h3.remove();
  }

  
    // Clear the form inputs
    event.target.reset();
  }
  

const main = async () => {
    navbar(LANDING_PAGE,rootElement);
    AddNavbarUnderline(checkActivePage());

    const contactForm = createContactForm();
    rootElement.appendChild(createDivExtra);
    createDivExtra.appendChild(contactForm);
    createDivExtra.appendChild(createLogo);

    document.querySelector(`#carth`).addEventListener(`click`, (e) => {
        window.location.href = `${LANDING_PAGE}cart`;
      });
}

main();