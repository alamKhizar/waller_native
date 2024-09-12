import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);
    const [username, setUsername] = useState(null);

    return (
        <UserContext.Provider value={{ userID, setUserID, username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
}
