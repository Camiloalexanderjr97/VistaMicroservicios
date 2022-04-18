import { Facultad } from './Facultad';
// import { Rol } from "./Rol";

export interface ProgramaAcademicoInterface {

  id?: String;
  nombre?: String;
  id_facultad?: Facultad; 
  facultad?: String;
 
}
