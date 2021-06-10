import { Router } from 'express';
const routes = new Router();
import Database from './database/index'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer';
import multerConfig from './config/multer';
const upload = multer(multerConfig);
import FileController from './app/controllers/FileController';

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// Rotas autenticadas
routes.use(authMiddleware)
routes.put('/users', UserController.update)

// Upload de arquivo
routes.post('/files', upload.single('file') , FileController.store );
 
export default routes;