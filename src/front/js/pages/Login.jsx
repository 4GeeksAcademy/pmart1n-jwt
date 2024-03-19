import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);

    const handleOnClick = async () => {
        const dataToSend = {
            email: email,
            password: password
        }
        const url = "https://sturdy-yodel-449jgpp46grfjjq6-3001.app.github.dev/api/login"
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
        const data = await response.json();
        console.log(data);
        console.log(response)
        actions.login(data.results);
        localStorage.setItem("token", data.acces_token)
    }
    return (
        store.isLogin ? <Navigate to="/dashboard" /> :
            <div className="container">
                <form>
                    <div className="form-outline mb-4 mt-5">
                        <input type="email" id="form1Example1" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <label className="form-label" htmlFor="form1Example1">Email</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form1Example2" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <label className="form-label" htmlFor="form1Example2">Password</label>
                    </div>
                    <button type="button" onClick={handleOnClick} className="btn btn-primary btn-block">Login</button>
                </form >
            </div >
    )

};