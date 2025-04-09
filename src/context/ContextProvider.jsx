import React, { createContext, useContext, useState, useRef } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(() => {
    const storedUser = localStorage.getItem("USER_DATA");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, _setToken] = useState(() => {
    return localStorage.getItem("ACCESS_TOKEN");
  });

  const logoutTimeout = useRef(null);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("USER_DATA", JSON.stringify(user));
    } else {
      localStorage.removeItem("USER_DATA");
    }
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_DATA");
    _setToken(null);
    _setUser(null);
  };

  const isLoggedIn = !!token;

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
