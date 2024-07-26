import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store, persistor } from "./features/store";
import "./index.css";
import api from "./api/api";

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Root = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("persist:auth");
      store.dispatch({ type: "RESET" });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
