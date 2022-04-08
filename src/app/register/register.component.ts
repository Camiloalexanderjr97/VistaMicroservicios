import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { CargarScriptsService } from "../cargar-scripts.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatFormFieldHarness } from "@angular/material/form-field/testing";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "app/Modelos/User";
import { UserAuthService } from "app/Services/user-auth.service";
// import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private authService: UserAuthService,   private router: Router  ) {}

  ngOnInit(): void {}


  signUp() {
    this.authService.register(this.user).subscribe((res) => {
      // Swal.fire("Register Success!", "Registrado correctamente, ya puedes iniciar sesión", "success");
      this.router.navigate(['/login']);
    });
  }
  signUpFirma() {
    this.authService.register(this.user).subscribe((res) => {
      // Swal.fire("Register Success!", "Registrado correctamente, ya puedes iniciar sesión", "success");
      this.router.navigate(['/login']);
    });
  }


  showNotification(from, align) {
    const type = ["", "info", "success", "warning", "danger"];
    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: "Petición enviada exitosamente",
      },
      {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}
