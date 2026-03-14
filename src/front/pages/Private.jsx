import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    // Creamos una variable para guardar la info que nos responda el backend
    const [infoSecreta, setInfoSecreta] = useState(null);

    // Este useEffect se ejecuta una sola vez cuando el usuario entra a la página /private
    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            // Si no hay token, lo mandamos al login inmediatamente
            navigate("/login");
        } else {
            // Si hay token, llamamos a la función para traer los datos
            obtenerInfoPrivada();
        }
    }, []); // Los corchetes vacíos significan que esto solo se ejecuta al montar el componente

    // Aquí colocamos la función que me preguntaste
    const obtenerInfoPrivada = async () => {
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private-info", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token // Enviamos el token al portero del backend
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Información privada recibida:", data);
                // Guardamos los datos en el estado de React para poder mostrarlos en el HTML
                setInfoSecreta(data);
            } else {
                console.log("Error o token expirado. El usuario debe iniciar sesión de nuevo.");
                // Si el token expiró o es inválido, limpiamos la sesión y mandamos al login
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        } catch (error) {
            console.error("Hubo un error en la petición:", error);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Área Privada</h1>
            <p>¡Hola! Si estás viendo esto, es porque tu token es válido.</p>

            {/* Mostramos la información solo si ya la recibimos del backend */}
            {infoSecreta ? (
                <div className="alert alert-success mt-4">
                    <h3>Datos desde el Backend:</h3>
                    <p><strong>Mensaje:</strong> {infoSecreta.msg}</p>
                    <p><strong>Email registrado:</strong> {infoSecreta.email}</p>
                </div>
            ) : (
                <p className="text-muted mt-4">Cargando información ultra secreta...</p>
            )}
        </div>
    );
};