import express from 'express'
import {operations} from './operations-router'

const app = express();
const port = 3000;


app.use('/operations', operations)

app.listen(port, () => {
    console.debug(`Server running 'router' on port ${port}`);
});

