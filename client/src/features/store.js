import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import companyReducer from "./companies/companySlice";
import serviceReducer from "./services/serviceSlice";
import userReducer from "./users/userSlice";
import racunReducer from "./racuni/racunSlice";
import djelatnostReducer from "./djelatnost/djelatnostSlice";
import kupacDobavljacReducer from "./kupacDobavljac/kupacDobavljacSlice.js";
import gradReducer from "./gradovi/gradSlice.js";
import drzavaReducer from "./drzave/drzavaSlice.js";
import bankaReducer from "./banke/bankaSlice.js";

const persistConfig = {
  key: "auth", // Specify a different key for each reducer
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedServiceReducer = persistReducer(
  { ...persistConfig, key: "service" },
  serviceReducer
);
const persistedCompanyReducer = persistReducer(
  { ...persistConfig, key: "company" },
  companyReducer
);
const persistedUserReducer = persistReducer(
  { ...persistConfig, key: "users" },
  userReducer
);
const persistedRacunReducer = persistReducer(
  { ...persistConfig, key: "racuni" },
  racunReducer
);

// const persistedDjelatnostReducer = persistReducer(
//   { ...persistConfig, key: "djelatnosti" },
//   djelatnostReducer
// );

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    company: persistedCompanyReducer,
    service: persistedServiceReducer,
    users: persistedUserReducer,
    racun: persistedRacunReducer,
    djelatnost: djelatnostReducer,
    kupacDobavljac: kupacDobavljacReducer,
    grad: gradReducer,
    drzava: drzavaReducer,
    banka: bankaReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export default store;
