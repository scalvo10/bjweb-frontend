import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    function logout() {
        setToken(null)
        console.log("Has hecho logout con éxito!");
        console.log(token);
    }

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;