import { Router } from 'express';
const routes = new Router();
import Database from './database/index'

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import CollaboratorController from './app/controllers/CollaboratorControler';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import multer from 'multer';
import multerConfig from './config/multer';

const upload = multer(multerConfig);


routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// Rotas autenticadas
routes.use(authMiddleware)
routes.put('/users', UserController.update)

//rota de agendamento
routes.post('/appointment', AppointmentController.store)

//listagem de agendamento
routes.get('/appointment', AppointmentController.index)

//lista todos os colaboradores
routes.get('/collaborator', CollaboratorController.index)

//listagem agendamento colaborador
routes.get('/schedule', ScheduleController.index)

// Upload de arquivo
routes.post('/files', upload.single('file') , FileController.store );
 
export default routes;