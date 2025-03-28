import React from "react";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
