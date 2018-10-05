import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';

import swal from'sweetalert2';

@Component({
  selector: 'app-ingreso-central',
  templateUrl: './ingreso-central.component.html',
  styleUrls: ['./ingreso-central.component.css']
})
export class IngresoCentralComponent  {

  constructor(private http: HttpClient, private router:Router) { }

   ipServer:string="localhost";
   user:string ="postgres";
   pasw:string="alvarado";
   database:string='proyectoBases';



   conect() {

    let jsonConect ={
      server:this.ipServer,
      username:this.user,
      pasw:this.pasw,
      database:this.database
    }


    return this.http.put("http://localhost:3000/conectar",jsonConect)
    .subscribe(
      success => {
        console.log("datos: ", success);
        if(success == true){
          swal('Correcto...', "Ingreso Exitoso.", 'success');
          document.getElementById("closemodal").click();
          this.router.navigate(['home']);  //  redirecciona a ruta
        }else{
          swal('Incorecto...', "Ingreso erroneo. Verifique sus credenciales.", 'error');
        }

      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectar.", 'error');
        console.log("Error ",err);
      }
    )
    ///////////////




   }




}
