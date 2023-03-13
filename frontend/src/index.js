// lib
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import axios from "axios";

// file
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { ContextProvider } from "./components/ContextProvider";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

axios.defaults.baseURL = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <PayPalScriptProvider deferLoading={true}>
                    <ContextProvider>
                        <App />
                    </ContextProvider>
                </PayPalScriptProvider>
            </BrowserRouter>
        </HelmetProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
