import React, { ComponentType, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes/routes";

import MainLayout from "./layouts/MainLayout/MainLayout";
import { LayoutProps } from "./Models/LayoutProps";
import { useGlobalState } from "./globalState";
import config from "@/config";

const App = () => (
    <Router>
        <div className="App">
            <Routes>
                {routes.map((route, index) => {
                    let Layout: ComponentType<LayoutProps> = MainLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    const Page = route.component;

                    // If route need login and user is not logged in, redirect to login page
                    if (route.auth && !useGlobalState("isLoggedIn")[0]) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Navigate to={config.routeLinks.login} />
                                }
                            ></Route>
                        );
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </div>
    </Router>
);

export default App;
