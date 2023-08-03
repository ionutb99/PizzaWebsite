/**
 * Creates the navbar
 * @param {string} LANDING_PAGE Landing page url
 * @param {string} rootElement Root element node
 */
export const navbar = (LANDING_PAGE, rootElement) => {
  //Create a fragment, a container(nav) and the items of the navbar
  const fragment = document.createDocumentFragment();
  const container = document.createElement(`nav`);
  container.id = `navbar`;
  const welcomeElement = document.createElement(`a`);
  const menuElement = document.createElement(`a`);
  const aboutElement = document.createElement(`a`);
  const storyElement = document.createElement(`a`);
  const contactElement = document.createElement(`a`);
  const cartElement = document.createElement(`i`);
  const firmName = document.createElement(`div`);
  const element1 = document.createElement(`p`);
  const element2 = document.createElement(`p`);
  //We also created an empty div to separate the navItems into 2 parts
  firmName.classList.add(`firmName`);
  //Add the href to each anchor element so we can rout to other pages
  welcomeElement.href = `${LANDING_PAGE}`;
  menuElement.href = `${LANDING_PAGE}menu`;
  aboutElement.href = `${LANDING_PAGE}allergens`;
  storyElement.href = `${LANDING_PAGE}story`;
  contactElement.href = `${LANDING_PAGE}contact`;
  cartElement.href = `${LANDING_PAGE}cart`;
  //Add the text content to the navbar items
  element1.innerText = `A Slice of Life`;
  element2.innerText = `For you`;
  welcomeElement.innerText = `Welcome`;
  menuElement.innerText = `Our menu`;
  aboutElement.innerText = `Allergens`;
  storyElement.innerText = `Story`;
  contactElement.innerText = `Contact`;
  //Add the navItem class to all the navbar items
  welcomeElement.classList.add(`navItem`);
  menuElement.classList.add(`navItem`);
  aboutElement.classList.add(`navItem`);
  storyElement.classList.add(`navItem`);
  contactElement.classList.add(`navItem`);
  //Add the class for the cart icon on the right side of the navbar(imported from fontawesome)
  cartElement.classList.add(`fas`);
  cartElement.classList.add(`fa-shopping-cart`);
  cartElement.id = "carth";


  //Append the navbar items to the navbar(container)
  firmName.appendChild(element1);
  firmName.appendChild(element2);
  container.appendChild(welcomeElement);
  container.appendChild(menuElement);
  container.appendChild(aboutElement);
  container.appendChild(firmName);
  container.appendChild(storyElement);
  container.appendChild(contactElement);
  container.appendChild(cartElement);
  //Add the container to the fragment
  fragment.appendChild(container);
  //Add the fragment to the root element
  rootElement.appendChild(fragment);
};

/**
 * Check wich page is active at the moment
 * @returns The name of the page we're currently on
 */
export const checkActivePage = () => {
  if (window.location.href.match(/[^/]+$/)) {
    return window.location.href.match(/[^/]+$/)[0];
  } else {
    return `welcome`;
  }
};

/**
 * Add underline to the navbarItem based on the page we're currrently on
 * @param {string} currentPage String returned by checkActivePage function
 */
export const AddNavbarUnderline = (currentPage) => {
  let nodes = document.querySelectorAll(`a`);
  let targetNode;
  for (const node of nodes) {
    node.classList.remove(`active`);
    if (node.innerText.toLowerCase().includes(currentPage)) {
      targetNode = node;
    }
  }
  if(targetNode != undefined) {
  targetNode.classList.add(`active`);

  }
};
