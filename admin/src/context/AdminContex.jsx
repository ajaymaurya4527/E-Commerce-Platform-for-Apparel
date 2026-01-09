import { createContext,useState,useEffect } from "react";


export const AdminContext= createContext();

const AdminContextProvider=(props)=>{

    const [token, setToken] = useState("");

    const value={token,setToken}

    useEffect(() => {
    const savedToken = localStorage.getItem("token"); // Get the actual value
    if (!token && savedToken) {
        setToken(savedToken); // Set the actual value, not the string "accessToken"
        
    }
}, []);



    return (
        <AdminContext.Provider value={value}>
            {props.children}

        </AdminContext.Provider>
    )
}

export default AdminContextProvider;