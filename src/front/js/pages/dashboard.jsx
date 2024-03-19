import React, { useContext } from "react";
import { Context } from "../store/appContext";



export const Dashboard = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="card text-center container mt-5" style={{ width: "18rem" }}>
            <img src="https://placehold.co/400" className="card-img-top" alt="..."></img>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">{store.user.email}</p>
            </div>
        </div>
    );
}