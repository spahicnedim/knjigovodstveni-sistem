import { Route, Routes } from "react-router-dom";
import { MaloprodajnaKalukacija } from "./MaloprodajnaKalukacija.jsx";
import { EditDokument } from "./Forme/EditDokument.jsx";

export function ListaDokumenata() {
  return (
    <Routes>
      <Route
        path='maloprodajna-kalkulacija'
        element={<MaloprodajnaKalukacija />}
      />
      <Route
        path='maloprodajna-kalkulacija/:dokumentId'
        element={<EditDokument />}
      />
    </Routes>
  );
}
