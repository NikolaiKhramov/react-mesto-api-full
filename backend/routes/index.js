import express from 'express';
import rootRoutes from './rootRoutes.js';
import usersRoutes from './users.js';
import cardsRoutes from './cards.js';
import checkAuth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';

const routes = express.Router();

routes.use('/', rootRoutes);
routes.use('/users', checkAuth, usersRoutes);
routes.use('/cards', checkAuth, cardsRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует.'));
});

export default routes;
