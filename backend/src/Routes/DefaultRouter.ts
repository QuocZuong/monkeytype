import { Request, Response } from "express";
import express from "express";

import uDAO from "../DAO/UserDao";
import User from "../Model/User";

const router = express.Router();

const routes = {
  empty: "/",
};

router.get(routes.empty, (req, res) => {
  console.log("Got a request on / at " + new Date().toISOString());

  uDAO
    .getAllUsers()
    .then((result) => {
      console.log("------------------");
      console.log("result from query:");
      console.log(result);
      console.log("------------------");

      res.status(200);
      res.json(result);
    })
    .catch(() => {
      res.status(404);
      res.json({ result: false });
    });
});

export default router;
