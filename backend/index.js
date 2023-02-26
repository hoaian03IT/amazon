import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import route from "./src/routes/index.js";
import { connectToDB } from "./src/config/db.js";

dotenv.config();

// connect to database
connectToDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
