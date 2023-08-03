//import functions for the navbar(They are reused on every site)
import { navbar } from "./navbar.js";
import { checkActivePage } from "./navbar.js";
import { AddNavbarUnderline } from "./navbar.js";
//Select the root element
const rootElement = document.querySelector(`#root`);
const LANDING_PAGE = `http://localhost:3000/`;



const storyTime = () => {
    const createDiv = document.createElement('div');
    createDiv.id = "bigDiv";
    const createSecondDiv = document.createElement('div');
    createSecondDiv.id = "secondDiv";
    
    const createLogo = document.createElement('img');
    createLogo.id = "logo";
    createLogo.src = '../assets/images/bass-removebg-preview.png';
    const h2Element = document.createElement("h2");
    h2Element.id = "h2Element";
    h2Element.innerText = `Introducing "A Slice of Life": A Slice of Heaven Delivered to Your Doorstep!`;
    const createParagraph = document.createElement('p');
    createParagraph.id = "paragraphStory";
    createParagraph.innerText = `Welcome to the ultimate online pizza haven - "A Slice of Life"! We take immense pride in being the one-stop destination for pizza enthusiasts in search of the perfect pie. With an extensive menu, premium ingredients, and swift delivery, we promise an extraordinary pizza experience that will leave you craving more.

    At A Slice of Life, we believe that pizza is not just a meal; it's an art form. That's why we've gathered a team of passionate pizza aficionados who tirelessly craft tantalizing creations. From the timeless Margherita to the bold BBQ chicken, our menu offers a diverse array of pizzas to cater to every palate.
    
    Quality is the foundation of our operation. We collaborate with local farmers to procure the freshest produce for our toppings, ensuring that each bite bursts with remarkable flavors. Our skilled chefs meticulously handcraft every pizza using top-tier ingredients, resulting in a harmonious blend of cheese, sauce, and toppings that will tantalize your taste buds.
    
    Ordering from A Slice of Life is a breeze. Our user-friendly website allows you to effortlessly navigate our extensive menu, customize your pizza with a variety of toppings, and even create your own masterpiece from scratch. With just a few clicks, you can place your order and track its progress in real-time.
    
    We understand that time is of the essence, and hunger waits for no one. Hence, we have streamlined our delivery process to be lightning-fast. Our dedicated fleet of drivers is committed to delivering your piping hot pizza straight to your doorstep, ensuring it arrives fresh and ready to be devoured. For those times when you simply can't wait to sink your teeth into that melty, cheesy goodness, we also offer express delivery options.
    
    At A Slice of Life, we treat our customers like family. We provide a seamless online ordering experience, attentive customer service, and a deep commitment to your satisfaction. We value your feedback and continuously strive to improve and surpass your expectations.
    
    However, A Slice of Life isn't solely about pizza. We also offer an array of delectable sides, from crispy garlic bread to tangy buffalo wings, to complement your meal. And for those with a sweet tooth, our dessert menu features irresistible treats like Nutella-stuffed calzones and velvety tiramisu.
    
    Whether you're hosting a gathering with friends, enjoying a cozy movie night, or simply yearning for a scrumptious dinner, A Slice of Life is here to elevate your pizza experience. With our unwavering dedication to quality, exceptional flavors, and prompt delivery, we are confident that once you savor A Slice of Life, you'll never settle for anything less.
    
    So, why wait? Visit our website, explore our enticing menu, and let A Slice of Life bring pizza perfection to your doorstep today!`;

    rootElement.appendChild(createDiv);
    rootElement.appendChild(createSecondDiv);
    createDiv.appendChild(h2Element);
    createDiv.appendChild(createParagraph);
    createSecondDiv.appendChild(createLogo);
}

const main = async () => {
    navbar(LANDING_PAGE,rootElement);
    AddNavbarUnderline(checkActivePage());
    storyTime();
    
    document.querySelector(`#carth`).addEventListener(`click`, (e) => {
        window.location.href = `${LANDING_PAGE}cart`;
      });
}

main();