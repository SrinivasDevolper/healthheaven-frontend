import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { AuthContextProvider } from "./context/AuthContex.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
