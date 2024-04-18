import { Usuario } from "../models/usuario.model";

export interface ApiResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: any
  }