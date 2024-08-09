import { Routes, Route } from "react-router-dom";
import UpdateCompany from "./UpdateCompany";
import AssignRadnici from "./AssignRadici";
import CreateRadnici from "./CreateRadnici";
import KupacDobavljac from "./KupacDobavljac.jsx";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route
          path='dodaj-firmu'
          element={<UpdateCompany />}
          allowedRoles={[1, 3]}
        />
        <Route
          path={'dodaj-kupacDobavljac'}
          element={<KupacDobavljac />}
          allowedRoles={[1, 3]}
        />
        <Route
          path='prava-zaposlenih'
          element={<AssignRadnici />}
          allowedRoles={[1, 3]}
        />
        <Route
          path='dodaj-radnika'
          element={<CreateRadnici />}
          allowedRoles={[1, 3]}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
