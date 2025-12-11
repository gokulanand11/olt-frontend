import React from "react";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./router.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <AppRouter />
      </main>
    </div>
  );
}