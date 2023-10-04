import { Router } from "express";
import express from "express";

const router = express.Router();

const routeRegexLinks = {
  user: /^\/user(?:\/(0-9+))?$/, // /user/1
};

router.get(routeRegexLinks.user, (req, res) => {
  const userId = Number(req.params[0]) || -1;

  if (userId > 0) {
    
  }
});

export default router;