import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from'sweetalert2';

import {nodo} from '../clases/nodo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient) { }

    listaNodo:Array<nodo>=[];

   ipServer:string="localhost";
   user:string ="postgres";
   pasw:string="alvarado";
   database:string='proyectoBases';
   nuevoNodo:any;

  pruebaNodo(){
    this.nuevoNodo = new nodo( this.ipServer,this.user,this.pasw, this.database );
    this.listaNodo.push(this.nuevoNodo);
    console.log("Se inserta nodo nuevo");

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




  DBUsar(server,user,pasw,db){        /// aca estan las credenciales
    console.log("Servidor: "+ server);
    console.log("User: "+ user);
    console.log("Pasw: "+ pasw);
    console.log("DataBase: "+ db);



  }

}
