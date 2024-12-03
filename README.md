
# Nyxis Makeup Shop
### Author: Daria Zelenska
### Springboard Software Engineering Career Track
### Capstone 2: Project Proposal

# Nyxis Project Proposal

## Viewing the Project

You can view the deployed version of the project at:

[https://nyxis.surganov.dev](https://nyxis.surganov.dev)

### Running Locally

If you'd like to run the application locally, follow the [How to Start and Run the Project](#how-to-start-and-run-the-project) section above.

- **Frontend**: Accessible by default at `http://localhost:3000`.
- **Backend**: Accessible on the port specified in your `.env` file.

---

---

|            | Description                                                                                                                                                                                                                                                                                                                                              | Fill in                                                                                                                                                                                                                                                                                                                                                                                                                                   |  
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|  
| **Tech Stack** | What tech stack will you use for your final project?                               | React.js for frontend, JSON-Server for backend (local development), PostgreSQL for keeping users data, Bootstrap for styling, JavaScript (Node.js, Express.js) for functionality, Makeup API for product data.                                                                                                                                                                                                                            |  
| **Type** | Will this be a website? A mobile app? Something else?                                                                                                                                                                                                                                                                                                    | Website                                                                                                                                                                                                                                                                                                                                                                                                                                   |  
| **Goal** | What goal will your project be designed to achieve?                                                                                                                                                                                                                                                                                                      | Build a user-friendly and personalized makeup shopping platform called "Nyxis." Users will be able to explore makeup products, create accounts, save their favorite products, use a shopping cart, and view personalized product suggestions through a feature called "Picks for You," which is based on their preferences.                                                                                                               |  
| **Users** | What kind of users will visit your app? In other words, what is the demographic of your users?                                                                                                                                                                                                                                                           | Primarily individuals interested in beauty and makeup products. Users who are looking for an easy and personalized shopping experience and want to explore and buy beauty products based on their own preferences.                                                                                                                                                                                                                        |  
| **Data** | What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack, you are required to create your own API. | I will use the Makeup API (http://makeup-api.herokuapp.com/) to gather product data including product names, brands, types, tags, and prices. User data will be collected upon registration, and preferences for makeup products will be stored in the user profile for the "Picks for You" feature. Additionally, user preferences will help filter recommendations based on their choices, such as foundation shade or favorite brands. |  

# Project Breakdown

| Task Name                            | Description                                                                                                                                              | Example                                                 |  
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|  
| Design Database schema               | Determine the models and database schema required for your project, including users, products, favorites, and cart.                                        | [Schema](resources/makeup_shop_schema.png) |  
| Source Data                          | Determine where your data will come from. In this case, you will use the Makeup API to fetch makeup product data.                                          | [API](http://makeup-api.herokuapp.com/?ref=apilist.fun) |  
| User Flows                           | Define how users will navigate through the app, including browsing products, managing favorites, and using the shopping cart.                              | [Flows](resources/shop_flow.pdf ) |  
| Set up backend and database          | Set up JSON-Server for local development and configure the environment for a backend to store user information like favorites and cart data.               | Backend                                                 |  
| Set up frontend                      | Set up React.js as the frontend framework and connect it to the Makeup API and your backend with API calls to handle data.                                 | Frontend, Medium, Must Have                             |  
| User Authentication                  | Implement user authentication for sign-up and login to allow users to manage their preferences, favorites, and shopping cart.                              | Full-stack feature, Easy, Must Have                     |  
| Set up forms                         | Implement sign-up and login forms. Provide product filtering and searching forms by brand, type, category, tags, and price.                                | Frontend, Easy, Must Have                               |  
| Set up User model                    | Define the user model to store information about registered users, their preferences, and their favorite products.                                         | Full-Stack, Easy, Must Have                             |  
| Set up Product model                 | Define the product model that will contain information about the makeup products fetched from the Makeup API.                                              | Backend, Easy, Must Have                                |  
| Set up Favorites model               | Define the favorites model to allow users to save and manage their favorite products.                                                                      | Backend, Easy, Must Have                                |  
| Set up Cart model                    | Define the cart model to allow users to add products to their shopping cart and manage the checkout process.                                               | Backend, Easy, Must Have                                |  
| User Authentication & Authorization  | Implement the logic for user authentication and authorization to protect user-specific pages like the favorites list and shopping cart.                    | Full-stack feature, Medium, Must Have                   |  
| Add Favorites Feature                | Full-stack feature that allows users to add products to their favorites and view them on their personal favorites page.                                    | Full-stack feature, Medium, Must Have                   |  
| Add Shopping Cart                    | Full-stack feature enabling users to add products to the cart and manage the checkout process.                                                             | Full-stack feature, Medium, Must Have                   |  
| Add Search Functionality             | Implement a search functionality that allows users to filter products by brand, type, category, tags, and price.                                           | Full-stack feature, Medium, Must Have                   |  
| Add Personalized Picks               | Full-stack feature that shows a “Picks for You” page, where users are shown products based on their preferences collected during registration.             | Full-stack feature, Medium, Nice to Have                |  
| Implement Recommendations Logic      | Implement the logic to filter and display personalized product recommendations based on user preferences and behavior.                                      | Full-stack feature, Medium, Nice to Have                |  
| Making and editing list of products  | Full-stack feature that allows users to see and filter a list of makeup products and manage favorites.                                                     | Full-stack feature, Medium, Must Have                   |  



# Database Schema
![Schema](resources/makeup_shop_schema.png)





# How to Start and Run the Project

## Prerequisites

Before running the application, ensure the following tools are installed:

### 1. Node.js and NVM
- **Install NVM (Node Version Manager):**
    - **macOS/Linux:**  
      Run the following in your terminal:
      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
      ```
      Restart your terminal and verify installation with:
      ```bash
      nvm --version
      ```
    - **Windows:**  
      Download and install NVM for Windows from [NVM for Windows](https://github.com/coreybutler/nvm-windows).
- **Install Node.js using NVM:**
    ```bash
    nvm install 22
    nvm use 22
    ```

### 2. Git
- Download and install Git from [Download Git](https://git-scm.com/).

### 3. Code Editor
- Install a code editor like [Visual Studio Code](https://code.visualstudio.com/) or [WebStorm](https://www.jetbrains.com/webstorm/).

---

## Dependencies

The following will be automatically installed with `npm install`:

- React
- React-DOM
- Reactstrap
- Bootstrap
- Font Awesome
- Slick Carousel (react-slick and slick-carousel)
- Lodash
- Axios
- Stripe.js

---

## Browser Compatibility

Ensure you're using one of the following modern browsers:

- **Google Chrome** (latest version)
- **Mozilla Firefox** (latest version)
- **Microsoft Edge** (latest version)

---

## Setup Instructions

### 1. Clone the Repository
1. Open your terminal or command prompt.
2. Clone the repository:
    ```bash
    git clone https://github.com/ZelenskaD/CapstoneProject2
    ```
3. Navigate to the project directory:
    ```bash
    cd CapstoneProject2
    cd project
    cd backend
    ```

### 2. Install Backend Dependencies
Run the following command to install backend dependencies:
```bash
npm install
```

### 3. Install Frontend Dependencies
1. Navigate to the frontend directory:
    ```bash
    cd ../nyxis/frontend
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```

---

## Create a Stripe Test Account

1. Go to [Stripe Signup](https://stripe.com).
2. Sign up for a test account.
3. Generate your **Stripe Secret Key** and **Stripe Publishable Key** from the developer dashboard under the API Keys section.

---

## Setting Up Environment Variables

### Backend Configuration
1. Navigate to the backend directory and create a `.env` file:
    ```bash
    touch .env
    ```
2. Add the following variables to the `.env` file:
    ```
    DATABASE_URL=(Your database URL)
    SECRET_KEY=(Your secret key)
    PORT=(Your desired port, e.g., 5000, but not 3000)
    STRIPE_SECRET_KEY=(Your Stripe Secret Key)
    NYXIS_URL=(URL to your frontend app)
    ```

### Frontend Configuration
1. Navigate to the frontend directory and create a `.env` file:
    ```bash
    touch .env
    ```
2. Add the following variables to the `.env` file:
    ```
    REACT_APP_STRIPE_PUBLISH_KEY=(Your Stripe Publishable Key)
    REACT_APP_BASE_URL_API=(URL to your backend app)
    REACT_APP_PRODUCT_URL_API=https://nyxis-backend.surganov.dev/api/v1/products
    ```
    - **Note**: Make sure that the `REACT_APP_PRODUCT_URL_API` is as defined above!

---

## Running the App

### 1. Start the Backend
1. Navigate to the backend directory:
    ```bash
    cd CapstoneProject2/project/backend
    ```
2. Start the backend server:
    ```bash
    npm start
    ```

### 2. Start the Frontend
1. Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd CapstoneProject2/project/nyxis/frontend
    ```
2. Start the frontend app:
    ```bash
    npm start
    ```

Your application should now be running, with the backend accessible on the configured port and the frontend accessible on the default development server port (`http://localhost:3000`).

---

# Project Directory Structure


```  
project/  
│  
├── backend/  
│   ├── helpers/  
│   │   ├── sql.js  
│   │   ├── tokens.js  
│   │  
│   ├── middleware/  
│   │   ├── auth.js  
│   │  
│   ├── models/  
│   │   ├── category.js  
│   │   ├── product.js  
│   │   ├── tag.js  
│   │   ├── user.js  
│   │  
│   ├── routes/  
│   │   ├── auth.js  
│   │   ├── cart.js  
│   │   ├── categories.js  
│   │   ├── products.js  
│   │   ├── stripe.js  
│   │   ├── tags.js  
│   │   ├── users.js  
│   │  
│   ├── schemas/  
│   │   ├── categoryFilter.json  
│   │   ├── categoryNew.json  
│   │   ├── categorySearch.json  
│   │   ├── categoryUpdate.json  
│   │   ├── preferencesUpdate.json  
│   │   ├── productFilter.json  
│   │   ├── productNew.json  
│   │   ├── productSearch.json  
│   │   ├── productUpdate.json  
│   │   ├── tagFilter.json  
│   │   ├── tagNew.json  
│   │   ├── tagSearch.json  
│   │   ├── tagUpdate.json  
│   │   ├── userAuth.json  
│   │   ├── userNew.json  
│   │   ├── userRegister.json  
│   │   ├── userUpdate.json  
│   │  
│   ├── .env  
│   ├── .gitignore  
│   ├── api.js  
│   ├── app.js  
│   ├── config.js  
│   ├── db.js  
│   ├── db.json  
│   ├── expressError.js  
│   ├── nyxis.sql  
│   ├── nyxis-schema.sql  
│   ├── nyxis-seed.sql  
│   ├── package.json  
│   ├── package-lock.json  
│   ├── server.js  
│   ├── testApi.js  
│  
├── frontend/  
│   ├── nyxis/  
│   │   ├── node_modules/  
│   │   ├── public/  
│   │   ├── src/  
│   │   │   ├── Banners/  
│   │   │   │   ├── BannerCarousel.js  
│   │   │   │  
│   │   │   ├── Forms/  
│   │   │   │   ├── LoginForm.js  
│   │   │   │   ├── SignupForm.js  
│   │   │   │  
│   │   │   ├── OtherComponents/  
│   │   │   │   ├── images/  
│   │   │   │   │   ├── BrandImages.js  
│   │   │   │   │   ├── default_picture_cart.png  
│   │   │   │   │  
│   │   │   │   ├── ButtonsComponent.js  
│   │   │   │   ├── CancelModal.js  
│   │   │   │   ├── CartModal.js  
│   │   │   │   ├── Footer.js  
│   │   │   │   ├── Homepage.js  
│   │   │   │   ├── ModalDropdown.js  
│   │   │   │   ├── NavBar.js  
│   │   │   │   ├── ParentComponent.js  
│   │   │   │   ├── ProblematicLinks.js  
│   │   │   │   ├── SuccessModal.js  
│   │   │   │   ├── TagsButtonComponent.js  
│   │   │   │   ├── UserContext.js  
│   │   │   │  
│   │   │   ├── ProductsComponents/  
│   │   │   │   ├── FilteredProducts.js  
│   │   │   │   ├── ProductCard.js  
│   │   │   │   ├── ProductDetail.js  
│   │   │   │   ├── ProductsList.js  
│   │   │   │   ├── Shop.js  
│   │   │   │  
│   │   │   ├── Styles/  
│   │   │   │   ├── BannerCarousel.css  
│   │   │   │   ├── BrandImages.css  
│   │   │   │   ├── ButtonsComponent.css  
│   │   │   │   ├── CartModal.css  
│   │   │   │   ├── CategoryLinks.css  
│   │   │   │   ├── Footer.css  
│   │   │   │   ├── Forms.css  
│   │   │   │   ├── ModalDropdown.css  
│   │   │   │   ├── NavBar.css  
│   │   │   │   ├── NotFound.css  
│   │   │   │   ├── ProductCard.css  
│   │   │   │   ├── ProductDetail.css  
│   │   │   │   ├── ProductList.css  
│   │   │   │   ├── SignupForm.css  
│   │   │   │   ├── SuccessModal.css  
│   │   │   │   ├── TagsButtonComponent.css  
│   │   │   │  
│   │   │   ├── App.js  
│   │   │   ├── App.css  
│   │   │   ├── api.js  
│   │   │   ├── index.js  
│   │   │   ├── reportWebVitals.js  
│   │   │   ├── setupTests.js  
│   │   │  
│   │   ├── package.json  
│   │   ├── package-lock.json  
│   │   ├── README.md  
  
```