# ZenFlux demo projects.

## shop-catalog

This is a demo project for ZenFlux. It is a simple catalog of products.

it uses both
- `@zenflux/core`
- `@zenflux/redux`

currently it includes:
- PHP vanilla backend
- Require PHP 7.4


- Controllers:
    - __Catalog__ - To handle catalog items per page.
    - __Cart__ - To handle cart items.
    - __Welcome__ - to determine if the backend available and to setup the database connection.


- Frontend
    - Simple Components:
        - Pagination.
        - Spinner.
        - Transaction.
    - Advance Components:
        - Welcome
        - Catalog
        - Cart
    - Layout components:
        - Navbar
        - Sidebar
    - Pages:
        - Catalog
        - Checkout

# Installation
### Get the repo:
```shell
git clone https://github.com/ZenFlux/demos
```

### Enter repo folder:
```shell
cd demos/shop-catalog
```

### Run the backend:
```shell
./backends/php-vanilla/run.sh
```

### Turn on new session & enter frontend folder:
```shell
cd demos/shop-catalog/frontends/react-shop-catalog
```

### Install dependencies:
```shell
npm install
```

### Run the frontend:
```shell
npm start
```

### Enter the frontend:
http://localhost:3000

### Setup the database connection:
![db-setup](./docs/_images/db-setup.png)
- Press connect.
- Wait few seconds till the pages reloaded.

#### And walla, you have a working catalog:
![catalog-working](./docs/_images/catalog-working.png)
