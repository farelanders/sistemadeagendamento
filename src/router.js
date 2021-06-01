import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res ) => {
    const user = await User.create({
            name: 'marcos travagin',
            email: 'marcos@email.com',
            password_hash: '1234',
        });
    return res.json(user)
});
 
export default routes;