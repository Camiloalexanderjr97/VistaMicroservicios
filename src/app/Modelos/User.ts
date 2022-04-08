import { Rol } from "./Rol";

export class User {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  rol?:Rol;
  idRol: Number; 
}
