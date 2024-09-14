import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DataTable from "../data/components/DataTable";
import AuthPage from "../auth/components/AuthPage";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/data" />
          ) : (
            <AuthPage onLogin={(newToken) => setToken(newToken)} />
          )
        }
      />
      <Route
        path="/data"
        element={
          token ? (
            <DataTable token={token} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
