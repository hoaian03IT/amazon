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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

route(app);
app.get("/api/keys/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
