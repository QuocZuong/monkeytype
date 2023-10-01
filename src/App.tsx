import React, { ComponentType, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";

import MainLayout from "./layouts/MainLayout/MainLayout";
import { LayoutProps } from "./Models/LayoutProps";

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
