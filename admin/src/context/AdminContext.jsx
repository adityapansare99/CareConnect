import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setatoken] = useState(localStorage.getItem("atoken")?localStorage.getItem("atoken"):"");
    const backendurl=import.meta.env.VITE_BACKEND_URL

    const value={
        atoken,
        setatoken,backendurl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminContextProvider;
