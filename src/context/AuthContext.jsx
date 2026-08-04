import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("careerai_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("careerai_user", JSON.stringify(user));
  }, [user]);

  const login = (email) => {
    setUser({ name: email.split("@")[0] || "There", email });
  };

  const register = (name, email) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("careerai_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
