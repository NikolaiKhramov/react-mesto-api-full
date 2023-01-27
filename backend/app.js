import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const { PORT = 3005 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listens port ${PORT}`);
});
