import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import connect from './connect';
import session from './session';
import parser from './parser';
import listenOn from './listener';

dotenv.config();

const port = process.env.PORT || '3003';
const db = process.env.DB_CONNECTION || 'not-provided';

const app: Application = express();

parser({ app });
session({ app });
connect({ db });
routes({ app });
listenOn({ app }, port);
