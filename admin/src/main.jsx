import { StrictMode } from "react";

import { Bounce, ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Store from "./redux/app/Store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </Provider>,
);
