import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    const token = sessionStorage.getItem("token");

    return (
        <div className="container py-5 text-center" style={{ maxWidth: "720px" }}>
            <h1 className="display-5 mb-3">Demo basica de autenticacion con JWT</h1>
            <p className="lead text-secondary">
                Registro, inicio de sesion, ruta privada y cierre de sesion en una aplicacion React + Flask.
            </p>
            <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
                <Link to={token ? "/private" : "/login"} className="btn btn-success">
                    {token ? "Ir al area privada" : "Iniciar sesion"}
                </Link>
                <Link to="/signup" className="btn btn-outline-primary">
                    Crear cuenta
                </Link>
            </div>
        </div>
    );
};
