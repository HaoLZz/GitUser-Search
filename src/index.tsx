import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";

function RedirectToSearch() {
  return <Navigate to="/search" replace />;
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToSearch />} />
        <Route path="/search/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
