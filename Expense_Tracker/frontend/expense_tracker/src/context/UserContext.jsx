import React, {createContext, useContext, useState} from "react";
export const userContext = createContext();

const UserProvider=({children})=>{
    const [user, setUser] = useState(null);
    //Funct to update user data
    const updUser=(userData)=>{setUser(userData);};
    //funct to clear user data (logout)
    const clrUser=()=>{setUser(null);};

    return(
        <userContext.Provider value={{user,updUser, clrUser}}>
            {children}
        </userContext.Provider>
    );
}

export default UserProvider;