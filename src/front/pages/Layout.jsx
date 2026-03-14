import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "../component/ScrollToTop"; 
import { Navbar } from "../component/Navbar";
import { Footer } from "../component/Footer";


import { Home } from "./Home";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import { Private } from "./Private.jsx";

export const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};
