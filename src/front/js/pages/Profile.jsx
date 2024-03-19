import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context)

    const getProfile = async () => {
        const url = "https://sturdy-yodel-449jgpp46grfjjq6-3001.app.github.dev/api/profile"
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        const response = await fetch(url, options)
        if (!response.ok) {
            console.log("error: ", response.status, response.statusText);
            return
        }
        const data = await response.json();
        actions.setMessage(data.message)
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div>
            <h1 className="text-center">Perfil del usuario</h1>
            <h2 className="text-center mt-5">{store.message}</h2>
        </div>
    )
}