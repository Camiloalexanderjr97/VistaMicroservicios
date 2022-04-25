import { Departamento } from './Departamento';
// import { Rol } from "./Rol";

import { Semillero } from "./Semillero";

export class Grupo {
      
  id?: String;
  nombre?: String;
  canIntegrantes?: String;
  fechaConformacion?: String;
  id_Semillero?: String;
  id_departamento?: String;
  semillero?: Semillero;
  departamento?: Departamento;


}
