import express from "express";
import dotenv from "dotenv";
import data from "./data.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/product/api", (req, res) => res.send(data.products));

app.listen(port, () => console.log(`server on http://localhost:${port}`));
