import * as cors from 'cors';
import * as express from "express";
import { apiController } from "./controllers/api";

/* tslint:disable:no-var-requires */
require("dotenv").config();

const app = express();

app.use(cors());
app.use(apiController);

export default app;
