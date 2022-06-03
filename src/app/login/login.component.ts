import { element } from 'protractor';
import { LoginUsuario } from './../Modelos/JWT/login-usuario';
import { AuthService } from './../Services/JWT/auth.service';
// import Swal from "sweetalert2";

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "app/Modelos/User";
import { TokenService } from 'app/Services/JWT/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  User: User = new User();


  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  roles: any[] = [];
  errMsj: String[];
  constructor( private router: Router,
    private tokenService: TokenService, private authService: AuthService) {

  }

  ngOnInit() {

    // console.log(this.User);
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();

    }

  }
  aut: string[];
  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(this.username);
        // console.log(this.usern ame);
        // console.log(data.authorities);
 
        this.tokenService.setAuthorities(data.authorities);
         this.tokenService.getAuthorities();
         console.log(this.tokenService.getAuthorities());

         const roles = this.tokenService.getAuthorities();
 
          for(let element of roles){

            if(element.authority==='ROLE_ADMIN'){
              sessionStorage.setItem("rol_", "ROLE_ADMIN");
             }
          }

        //  roles.forEach(rol => {
        //      if(rol.nombre==='ROLE_ADMIN'){
        //       sessionStorage.setItem("rol_", "ROLE_ADMIN");
        //       console.log("entra----------")
        //      }
        //      });

        // this.aut.forEach(rol => {
        //   if (rol === 'ROLE_ADMIN') {

          //   }
          // });


          this.router.navigate(['/dashboard']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sesion Iniciada',
            showConfirmButton: false,
            timer: 1500
          })
        // Swal.fire({
        //   title: '¿Con que tipo de Usuario le gustaria Acceder?',
        //   showDenyButton: true,
        //   showCancelButton: true,
        //   confirmButtonText: 'Admin',
        //   denyButtonText: `User`,
        //   denyButtonColor: '#2767EF'
        // }).then((result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {

        // this.router.navigate(['/dashboard']);
        // sessionStorage.setItem("rol_", "ROLE_ADMIN");
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'Sesion Iniciada',
        //       showConfirmButton: false,
        //       timer: 1500 
        //     })
        //   } else if (result.isDenied) {

        //   }
        // })
  

        
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Datos no validos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );

  }

  // signIn() {
  //   console.log(this.User.username + "------" + this.User.password);
  //   this.userauthService.signIn(this.User).subscribe((res) => {
  //     localStorage.setItem("user", JSON.stringify(res));
  //     if (res != null) {
  //       // Swal.fire("Login Success!", "inicio de sesión correctamente!", "success");
  //       this.router.navigate(['/dashboard']);

  //     } else {
  //       // Swal.fire("Login Error!", "credenciales incorrectas!", "warning");
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }





}
