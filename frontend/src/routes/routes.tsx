// Layout
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Home from "@/page/Home";
import config from "@/config";
import { RouteProps } from "@/Models/RouteProps";
import About from "@/page/About";
import Setting from "@/page/Setting";
import Profile from "@/page/Profile";
import Login from "@/page/Login";

// include routes need login and don't need
const routes: Array<RouteProps> = [
    {
        path: config.routeLinks.home,
        component: Home,
        layout: MainLayout,
    },
    {
        path: config.routeLinks.about,
        component: About,
        layout: MainLayout,
    },
    {
        path: config.routeLinks.setting,
        component: Setting,
        layout: MainLayout,
    },
    {
        path: config.routeLinks.profile,
        component: Profile,
        layout: MainLayout,
    },
    {
        path: config.routeLinks.login,
        component: Login,
        layout: MainLayout,
    },
];

export default routes;
