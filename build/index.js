"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
let conn;
let debug = false;
if (debug) {
    // console.log(`My DB_CONNECTION_URL is ${DB_CONNECTION_URL}`);
}
initExpress(app);
initDBConnection(mongoose);
router(app);
// -------------------------- FUNCTIONS ------------------------------
function initExpress(app) {
    app.listen(3001);
}
function initDBConnection(mongoose) {
    conn = mongoose.createConnection(DB_CONNECTION_URL).asPromise();
    conn.then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB");
        console.log(err);
    });
}
function router(app) {
    app.get("/", (req, res) => {
        console.log("Got a request on /");
        res.json({
            user: "username",
            password: "password"
        });
    });
}
