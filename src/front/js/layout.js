import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { ViewBook } from "./pages/addReview"
import injectContext from "./store/appContext";
import About from "./pages/about";
import { ChangePasswordForm } from "./pages/changePasswordForm";
import { ModifyReview } from "./pages/modifyReview";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<ViewBook />} path="/viewbook" />
                        <Route element={<ModifyReview />} path="/modifyreview" />
                        <Route element={<ChangePasswordForm/>} path="/updateprofile" />
                        <Route element={<About />} path="/about" />
                        <Route element={<h1>Vaya, parece que aquí no hay nada...</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);