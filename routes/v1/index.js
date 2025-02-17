// routes/v1/index.js
import express from 'express';
import mentorRoutes from './mentorRoutes.js';
import userRoutes from './userRoutes.js';

const v1Router = express.Router();

//use user routes
v1Router.use('/user', userRoutes);
// Use mentor routes 
v1Router.use('/mentor', mentorRoutes);

 
export default v1Router;
