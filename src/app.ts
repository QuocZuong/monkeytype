import { Request, Response } from "express";

const express = require('express');

const app = express();
app.listen(3001);
// app.use('/', routes)

app.get("/", (req: Request, res: Response) => {
  console.log("Got a request on /");

  res.json(
    {
      user: "username",
      password: "password"
    }
  );
});