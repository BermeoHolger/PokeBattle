import { api } from "../api/api";

export const getEstadisticas = () => api.get("/estadisticas");
export const postLogin = () => api.post("/login");
export const registrar = () => api.post("/registro");


