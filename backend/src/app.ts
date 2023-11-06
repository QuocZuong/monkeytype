import express from "express";
import Routes from "./Routes/Routes";

const app = express();

Routes.forEach((route) => {
  app.use(route.path, route.router);
  console.log(`Added route for path ${route.path}`);
});

app.listen(50000);
