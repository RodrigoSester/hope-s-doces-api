# Hope's Doce

Recently, my wife and I opened a small business. We are selling desserts.
So, I decided to create an API to manage the products and orders.

## Technologies
NodeJS, Express, JWT, Git, VSCode, PostgreSQL.

## How to run
1. Clone this repository
2. Install dependencies
```bash
npm i
```
3. Create a file named .env based on .env.example
4. Create a database and run the migrations
```bash
npm run migrations
```
5. Run the server
```bash
npm run dev
```
6. Use the API
```bash
curl http://localhost:3000
```

## Routes
### Products
- POST /person
- GET /person
- GET /person/:id

### Orders
- POST /order

### Recipe
- POST /recipe/profit

### User
- POST /user
- POST /user/login

## Author
- Rodrigo Weber Sesterheim

## Tests
```bash
npm run test
```