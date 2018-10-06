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
   queryUser:string= 'Select * from ';
   numConexion=0;

   nuevoNodo:any; // variable guarda objeto nodo creado


  pruebaNodo(){
    this.nuevoNodo = new nodo( this.ipServer,this.user,this.pasw, this.database );

    this.numConexion++;

    let jsonConect ={
      server:this.ipServer,
      username:this.user,
      pasw:this.pasw,
      database:this.database,
      conn:this.numConexion
    }

    return this.http.put("http://localhost:3000/conectarNodo",jsonConect)
    .subscribe(
      success => {
        if(success == true){
          swal('Correcto...', "Ingreso Exitoso.", 'success');
          document.getElementById("closemodal").click();
          this.listaNodo.push(this.nuevoNodo);
          console.log("Se inserta nodo nuevo");
        }else{
          swal('Incorecto...', "Ingreso erroneo. Verifique sus credenciales.", 'error');
        }
        console.log("datos--->: ", success);
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )
  }




  DBUsar(server,user,pasw,db,dblink){        /// aca estan las credenciales
    console.log("Servidor: "+ server);
    console.log("User: "+ user);
    console.log("Pasw: "+ pasw);
    console.log("DataBase: "+ db);
    console.log('dbLink: '+dblink);
  }

  ConsultaQuery(server,user,pasw,db,dblink){
    console.log("ejecuta consulta query");
    console.log(" ---- "+ this.queryUser);
  }


}

