// Import the express in typescript file
import express from 'express';

import {orderRouter} from './orderRouter'
import {utils} from './utils-router'

// Initialize the express engine
const app: express.Application = express();
// Take a port 3000 for running server.
const port: number = 3000;

app.use('/orders', orderRouter);
app.use('/utils', utils);

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.send("Welcome to the main page. Are you looking for routes:\n/orders ?");
});

// Server setup
app.listen(port, () => {
	console.log(`TypeScript with Express
		http://localhost:${port}/`);
});
