import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);

    const handleSignup = async () => {
        const dataToSend = {
            email: email,
            password: password,
        }
        const url = "https://sturdy-yodel-449jgpp46grfjjq6-3001.app.github.dev/" + "api/signup"
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            console.log("error: ", response.status, response.statusText);
            return
        }
        const data = await response.json()
        alert("Usuario Registrado Con Exito");
        actions.login();
        localStorage.setItem("token", data.access_token)
    }
    return (
        <div className="container mt-5">
            <h1 text-center> Formulario de registro </h1>
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example3">Email address</label>
                <input type="email" id="form3Example3" value={email} onChange={(event) => setEmail(event.target.value)} class="form-control" />
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form3Example4">Password</label>
                <input type="password" id="form3Example4" value={password} onChange={(event) => setPassword(event.target.value)} class="form-control" />
            </div>
            <button data-mdb-ripple-init type="button" onClick={handleSignup} class="btn btn-primary btn-block mb-4">Registrarse</button>
        </div>
    )
}