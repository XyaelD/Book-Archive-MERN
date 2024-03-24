import express, { request, response } from "express";
//A config.js file is needed to set the PORT and mongoDBURL, or a similar implementation
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Website');
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });

