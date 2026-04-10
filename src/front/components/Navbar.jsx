import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">JWT Demo</span>
            </Link>
            <div className="ml-auto">
                {token ? (
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Cerrar sesion
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary">Iniciar sesion</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};
