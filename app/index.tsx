import React from "react";
import LoginPage from "./loginPage";
import { AuthProvider } from "../components/AuthContext";

export default function Index() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
