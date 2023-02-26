import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();
   
    

    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Calendario</Link>
                <Link to="/patients">Carga de pacientes</Link>
                <Link to="/appointments">Carga de citas</Link>
                <Link to="/users">Usuarios</Link>
            </aside>
            <div className="content">
                <header>
                    <h1>PRUEBA SOCCER SYSTEM PRO</h1>
                    <div>
                        <button className="btn-logout" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
