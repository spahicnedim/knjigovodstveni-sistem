import { Route, Routes } from "react-router-dom";
import { ListaDokumenata } from "./VrsteDokumenata/ListaDokumenata.jsx";
import { EditMaloprodajnaKalkulacija } from "./VrsteDokumenata/MaloprodajnaKalkulacija/EditMaloprodajnaKalkulacija.jsx";

export function ListaDokumenata() {
  return (
    <Routes>
      <Route
        path='lista-dokumenata'
        element={<ListaDokumenata />}
      />
      <Route
        path='lista-dokumenata/:dokumentId'
        element={<EditMaloprodajnaKalkulacija />}
      />
    </Routes>
  );
}
