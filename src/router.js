import { Router } from 'express';
const routes = new Router();
import Database from './database/index'
import UserController from './app/controllers/UserController';

routes.post('/users', UserController.store)


 
export default routes;