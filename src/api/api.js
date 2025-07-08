import axios from "axios";
import { useState, useEffect } from "react";

export const api = axios.create({ 
  baseURL: 'http://localhost:8000', 
  headers:{ 'Content-Type': 'application/json', },
});
