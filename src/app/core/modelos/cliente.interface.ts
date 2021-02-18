import { Usuario } from "./usuario.interface";


export interface Cliente extends Usuario{
  nombre ?: string;
  apellido ?: string;
  telefono ?: number;
  photoURL ?: string;
  domicilio ?: Domicilio;
  estado ?: number;
}

export interface Domicilio {
  num: number,
  dir: string
}
