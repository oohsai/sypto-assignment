# Fyers API Backend

## Overview

This project serves as a backend server to consume Fyers API's for various functionalities including fetching current holdings, placing buy and sell orders, handling postback from the broker, and getting prices from WebSocket.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the required configurations in the `config.js` file.
4. Start the server using `npm start`.

## Features

1. **Authentication Middleware**: Implemented a middleware for authentication to ensure that all requests are properly authenticated before accessing the routes.
2. **Schema Implementation**: Implemented schemas using Zod for request validation to ensure that all incoming requests are structured correctly and free from errors.
3. **Routes**: Created routes for various functionalities including multi-buy order placement, single buy order placement, sell order placement, handling postback from the broker, and starting a WebSocket connection to get prices.
4. **Error Handling**: Proper error handling is implemented throughout the application to handle any unexpected errors and provide meaningful responses to the clients.
5. **Full Safe Endpoint**: Ensured that all endpoints are full safe, meaning requests are properly structured and validated before processing, thus minimizing the chances of errors.

## Endpoints

- **/multi-buy-order**: Endpoint for placing multi-buy orders.
- **/buy-order**: Endpoint for placing single buy orders.
- **/sell-order**: Endpoint for placing sell orders.
- **/postback**: Endpoint to handle postback from the broker.
- **/websocket**: Endpoint to start a WebSocket connection for getting prices.

## Technologies Used

- Node.js
- Express.js
- Axios
- Zod
