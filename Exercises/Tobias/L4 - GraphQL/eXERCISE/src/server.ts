import express from 'express'

import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema'

// The code below starts a bare-bone express web server
import bodyParser from 'body-parser';

//import getClient from './db/db-client';
//import { testClient } from './db/db-client';

import pgClient from './db/db-client';

//testClient(); // Comment in this and outcomment everything below to test postgres connection

const app = express()
const port = 3000

app.use(express.static('public'))

app.use( (req, res, next) => {
  console.log("\nReceived request: " + req.method + " on " + req.url);
  next();
});


app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true,
  })
);


app.use('/', (req, res) => {
  res.send("You've reached the index");
});



app.listen(port, () => {
    console.log(`Running 'SWABE Assignment 1' on ${port}`)
  })

