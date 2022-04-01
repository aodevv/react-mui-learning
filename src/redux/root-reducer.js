import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import infosDossierReducer from "./DossierInfos/infoDossier.reducer";
import facturesReducer from "./Factures/Factures.reducer";
import salairesReducer from "./Salaires/salaires.reducer";
import machineriesReducer from "./Machineries/machineries.reducer";
import sitesReducer from "./Sites/Sites.reducer";
import authReducer from "./Auth/Auth.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "dossiers",
    "sites",
    "factures",
    "salaires",
    "machineries",
  ],
};

const rootReducer = combineReducers({
  dossiers: infosDossierReducer,
  sites: sitesReducer,
  factures: facturesReducer,
  salaires: salairesReducer,
  machineries: machineriesReducer,
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
