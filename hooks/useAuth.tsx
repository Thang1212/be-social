import { useEffect, useState } from "react";
import { secureGet } from "@/utils/storage";

export default function useAuth() {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await secureGet("token");
            console.log("use auth token: " + token);
            setToken(token || "");
            setIsLoading(false);
        };

        fetchToken();
    }, [])

    return { token, isLoggedIn: !!token, isLoading };
}
