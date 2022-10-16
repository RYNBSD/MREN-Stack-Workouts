import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {

    const authContext = useContext(AuthContext);    

    if (!authContext) {
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return {
        user: authContext.user,
        dispatch: authContext.dispatch
    }
}