import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import companyReducer from "./companies/companySlice";
import serviceReducer from "./services/serviceSlice";
import userReducer from "./users/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedServiceReducer = persistReducer(persistConfig, serviceReducer);
const persistedCompanyReducer = persistReducer(persistConfig, companyReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    company: persistedCompanyReducer,
    service: persistedServiceReducer,
    users: persistedUserReducer,
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
