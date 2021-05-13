// gamla sättet att importera
// const express = require('express');

// med "type":"module" - modern import som react
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import UserRoutes from './src/routes/User.Routes.js'
import Configurations from './src/configurations/Configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import cors from 'cors'

// // funktion som ger oss tillgång till filen
// dotenv.config();
// // destructure out PORT
// const { PORT } = process.env;

// kan också döpas till server - wrapper hela applikationen
const application = express();
application.use(express.json());
application.use(helmet());
application.use(cors({credential: true}))
application.use(morgan('common'));

// const isOrderPayedFor = (request, response, next) => {
//     console.log("PAYMENT VERIFIED");
//     next();
// }

// application.use(isOrderPayedFor);

// request är den info som skickas med anropet - response är det som vi returnerar med anropet
// middleware-funktionen isOrderPayedFor kommer köras först
// application.get('/order', isOrderPayedFor, (request, response) => {
//     response.send("ORDER ACCEPTED: " + Math.random());
// })

// application.get('/hello', (request, response) => {
//     response.send("HELLO!!" + "YO YO YO!");
// })

UserRoutes.routes(application);

application.use(Middlewares.notFound);
Configurations.connectToPort(application);
Configurations.connectToDatabase();