import * as express from "express";
import { apiController } from "./controllers/api";

require("dotenv").config();

const app = express();

app.use(apiController);

export default app;
