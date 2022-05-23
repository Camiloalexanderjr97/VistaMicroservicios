import { TokenService } from 'app/Services/JWT/token.service';
import * as Chartist from 'chartist';
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/Modelos/User";
// import SignaturePad from "signature_pad";
// import { CargarScriptsService } from "../cargar-scripts.service";
import { UsuarioService } from "app/Services/usuario.service";
import { UserAuthService } from "app/Services/user-auth.service";
import Swal from 'sweetalert2';
// import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  user = new User();
  ListarUser: User[]=[];
  
    constructor(private usuarioService: UsuarioService, private router: Router, private tokenService: TokenService) {
      //_CargaScripts.Carga(["main3"]);
    }
     listarUser(){
      this.usuarioService.getUsuario().subscribe((data: any) => {
        this.ListarUser = data;
        console.log(this.ListarUser);
      });
    }

    deleteUser(id: any){
      console.log(id);
      this.usuarioService.deleteUser(id).subscribe( (data: any) => {
        
        console.log(data)
          Swal.fire("Register Success!", "Eliminado correctamente", "success");
        this.router.navigate(['/table-list']);
      },
      (error) => Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    )

    }
    isLogged= false;
  ngOnInit() {
  

    if (this.tokenService.getToken()) {
      this.isLogged = true;
        this.listarUser();
    } else {
      this.isLogged = false;


      this.router.navigate(['/login']);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No tienes Acceso',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
