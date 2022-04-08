import { Router } from '@angular/router';
import { UsuarioService } from './../Services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/Modelos/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user: User = new User();
  constructor(private usuarioService: UsuarioService, private router: Router) { }

 


  register(): void {

    // alert(this.user.idRol);
    this.usuarioService.addUser(this.user).subscribe( (data: any) => {
        
        this.user = data ;
        console.log(data)
          Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.router.navigate(['/table-list']);
      },
      (error) => Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    )
  }

  ngOnInit() {
  }

  // addHemocomponente(inp) {
  //   alert(inp.value);
  //   if (inp.value == 'Admin') {
  //   inp="1";
  //   } else {
  //     inp="2";
  //   }
  //   this.user.idRol=inp.value;
  //   alert(inp.value);
  // }

}
