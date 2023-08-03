Backend\data\featuredPizzaList.js => contains the data of the featured pizzas we display on the landing page.
Backend\helper\featuredPizza.js => contains an additional route so we can fetch the featured pizzas array on the frontend.
Backend\routes => will contain the additional routers for the other parts of the website
Backend\server.js => contains the main logic of our backend.

--------------------------------------------------------------------------------------------------------------------------
Frontend\views\index.html => contains the html file of the landing page. The views folder contains all the html files we'll use.
Frontend\styles => contains the separate css files for each page. It's easier to keep track of things this way.
Frontend\scripts => contains the separate js files we use for each page on the frontend.


----------------------------------------------------------------------------------------------
Frontend\scripts\navbar.js => contains the function used to create the navbar. These functions are exported so we can reuse them on every page