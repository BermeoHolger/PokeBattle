import { Routes, Route } from "react-router";
import GetEstadisticas from "../pages/GetEstadisticas";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="estadisticas" element={<GetEstadisticas />} />
    </Routes>
  );
};

export default AppRoutes;