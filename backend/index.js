import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/product/api", (req, res) => res.send("Hello"));

app.listen(port, () => console.log(`server on http://localhost:${port}`));
