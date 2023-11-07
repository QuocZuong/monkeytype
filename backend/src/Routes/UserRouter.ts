import express from "express";
import uDAO from "../DAO/UserDao";
import User from "../Model/User";

const router = express.Router();

const routes = {
  empty: "/",
  username: /username\/([a-zA-z0-9]+)/, // /Username123
  login: "/login",
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

// Get user by username
router.get(routes.username, (req, res) => {
  const username = String(req.params[0]);

  console.log(`Got a request on /${username} at ${new Date().toISOString()}`);

  uDAO
    .getUserByUsername(username)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch(() => {
      res.status(404);
    });
});

// Login
router.post(routes.login, (req, res) => {
  const user = req.body as User;

  console.log("Got a request on /login at " + new Date().toISOString());

  uDAO
    .getUser(user)
    .then((result) => {
      
      console.log("------------------");
      console.log("result from query:");
      console.log(result);
      console.log("------------------");

      if (!result) {
        throw new Error("User not found");
      }

      res.status(200);
      res.json({ result: true, ...result});
    })
    .catch((err) => {
      res.status(404);
      res.json({ result: false, error: err.message });
    });
});

export default router;
