import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const fallbackLng = ["en", "es", "gl", "pt"];
if(window.localStorage.getItem("lang") === null) {
    const browserLanguage = navigator.language.split("-")[0];
    window.localStorage.setItem("lang", fallbackLng.includes(browserLanguage) ? browserLanguage : "en");
}

const resources = fallbackLng.reduce((a, l) => {
    a[l] = { translation: require(`./i18n/${l}.json`)};
    return a;
}, {})

i18n.use(initReactI18next).init({
    resources,
    lng: window.localStorage.getItem("lang"),
    fallbackLng
});

if(window.localStorage.getItem("theme") === null) {
    window.localStorage.setItem("theme", "dark");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)