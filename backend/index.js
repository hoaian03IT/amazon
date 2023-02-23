import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import route from "./src/routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
route(app);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
