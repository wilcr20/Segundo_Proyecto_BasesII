import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient) { }

  ipServer:string="localhost";
   user:string ="postgres";
   pasw:string="alvarado";
   database:string='proyectoBases';

  pruebaNodo(){
    let jsonConect ={
      server:this.ipServer,
      username:this.user,
      pasw:this.pasw,
      database:this.database
    }

    return this.http.put("http://localhost:3000/conectarNodo",jsonConect)
    .subscribe(
      success => {
        console.log("datos: ", success);
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )
  }



}
