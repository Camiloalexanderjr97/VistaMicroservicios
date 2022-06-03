import { Departamento } from './Departamento';
// import { Rol } from "./Rol";

import { Semillero } from "./Semillero";

export class Grupo {
      
  id?: String;
  nombre?: String;
  sigla?: String;
  director?: String;
  canIntegrantes?: number;
  fechaConformacion?: Date;
  semillero?: number;
  id_departamento?: String;
  lineaInvestigacion?: String;
  departamento?: Departamento;


}
