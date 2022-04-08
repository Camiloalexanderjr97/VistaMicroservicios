// import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "app/Modelos/User";
import { UserAuthService } from "app/Services/user-auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  User: User = new User();

  constructor(private authService: UserAuthService, private router: Router) {}
  ngOnInit(): void {}

  signIn() {
    console.log(this.User.username + "------" + this.User.password);
    this.authService.signIn(this.User).subscribe((res) => {
      localStorage.setItem("user", JSON.stringify(res));
      if (res != null ) {
        // Swal.fire("Login Success!", "inicio de sesión correctamente!", "success");
        this.router.navigate(['/dashboard']);
       
      } else{
        // Swal.fire("Login Error!", "credenciales incorrectas!", "warning");
        this.router.navigate(['/login']);
      }
    });
  }


}
