import { Request, Response } from "express";
import express from "express"

import uDao from "./DAO/UserDao";
import User from "./Model/User";

const app = express();
// const uDao = new uDao();

app.listen(50000);

// app.use('/', routes)

app.get("/", async (req: Request, res: Response) => {
  console.log("Got a request on /");

  // await uDao.createUser(new User("Heo", "HeoMap"));
  let result = await uDao.getAllUser();

  console.log(`result from query: ${result}`);

  res.json(result);
});