import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [infoSecreta, setInfoSecreta] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        obtenerInfoPrivada();
    }, [navigate]);

    const obtenerInfoPrivada = async () => {
        const token = sessionStorage.getItem("token");

        try {
            setError("");
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            const data = await response.json();

            if (response.ok) {
                setInfoSecreta(data);
                return;
            }

            sessionStorage.removeItem("token");
            setError(data.msg || "Tu sesion no es valida.");
            navigate("/login");
        } catch {
            setError("No se pudo cargar el contenido privado.");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Area privada</h1>
            <p>Si estas viendo esto, es porque tu token sigue siendo valido.</p>

            {infoSecreta ? (
                <div className="alert alert-success mt-4">
                    <h3>Datos desde el backend</h3>
                    <p><strong>Mensaje:</strong> {infoSecreta.msg}</p>
                    <p><strong>Email registrado:</strong> {infoSecreta.email}</p>
                </div>
            ) : (
                <p className="text-muted mt-4">Cargando informacion privada...</p>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};
