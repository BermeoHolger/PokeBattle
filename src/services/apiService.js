import { api } from "../api/api";

export const statpage = () => api.get("/estadisticas");
export const postLogin = () => api.post("/login");
export const registrar = () => api.post("/registro");


