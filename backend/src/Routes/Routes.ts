import { Router } from "express";

import DefaultRouter from "./DefaultRouter";
import UserRouter from "./UserRouter";

const baseUrl = "/api/monkeytype";

type Route = {
  path: string;
  router: Router;
};

export const Routes: Array<Route> = [
  { path: `${baseUrl}`, router: DefaultRouter },
  { path: `${baseUrl}/users`, router: UserRouter },
];

export default Routes;
