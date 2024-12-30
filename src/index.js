import express from "express";
import dotnev from "dotenv";

dotnev.config();

const app = express();

const PORT = process.env.PORT || 8000;
app.listen(5000, () => {
    console.log("Server is running at http://localhost:${PORT}");
    });