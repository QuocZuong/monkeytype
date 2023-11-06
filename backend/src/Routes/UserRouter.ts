import express from "express";
import uDAO from "../DAO/UserDao";

const router = express.Router();

const routes = {
  username: /username\/([a-zA-z0-9]+)/, // /Username123
  login: "/login",
};

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
  const user = req.body;

  console.log(
    "Got a request on /login at " + new Date().toISOString()
  );
  console.log(user);

  uDAO.getUser(user)
    .then(() => {
      res.status(200);
      res.json({ result: true });
    })
    .catch(() => {
      res.status(404);
      res.json({ result: false });
    });
});

export default router;
