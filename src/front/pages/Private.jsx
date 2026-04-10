import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        loadPrivateData();
    }, [navigate]);

    const loadPrivateData = async () => {
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
                setUserData(data);
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
            <p>Este contenido solo se muestra cuando el token sigue siendo valido.</p>

            {userData ? (
                <div className="alert alert-success mt-4">
                    <h3>Sesion iniciada</h3>
                    <p><strong>Mensaje:</strong> {userData.msg}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p className="text-muted mt-4">Cargando...</p>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};
