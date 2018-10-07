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
  listaSchemas:any={};
  listaTablas:any={};

    // Variables NgModel ...
   ipServer:string="localhost";
   user:string ="postgres";
   pasw:string="alvarado";
   database:string='proyectoBases';
   queryUser:string= 'Select * from ';
   numConexion=0;


   // Variables de datos para verificar con la conexion actual.
   serverActual:string;
   userActual:string;
   paswActual:string;
   databaseActual:string;
   schemaActual:string;
   tablaActual:string;

   nuevoNodo:any; // variable guarda objeto nodo creado


  pruebaNodo(){  // Metodo para conectar nodos de base de datos, mediante DBlink
    this.nuevoNodo = new nodo( this.ipServer,this.user,this.pasw, this.database );

    this.numConexion++;

    let jsonConect ={    // Json a enviar por el endpoint
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





  obtenerSchemas(server,user,pasw,db,dblink) {        /// recibe las credenciales por parametro alv

    this.serverActual= server;
   this.userActual= user;
   this.paswActual= pasw;
   this.databaseActual=db;


    let jsonConect ={  // Json a enviar por el endpoint
      server:server,
      username:user,
      pasw:pasw,
      database:db
    }

    return this.http.put("http://localhost:3000/obtenerSchemas",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          this.listaSchemas= success;
          this.listaTablas={};
          console.log("esquemas obtenidos: ",this.listaSchemas);
        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )
  }




  obtenerTablas(esquema){
    this.schemaActual= esquema;
    console.log("Nombre Scheama usar, "+ esquema);

    let jsonConect ={  // Json a enviar por el endpoint
      server:this.serverActual,
      username:this.userActual,
      pasw:this.paswActual,
      database:this.databaseActual,
      esquema: this.schemaActual
    }

    return this.http.put("http://localhost:3000/obtenerTablas",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          this.listaTablas= success;
          console.log("tablas obtenidos: ",this.listaTablas);
        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )
  }



  obtenerPrivilegiosTabla(tabla){
    this.tablaActual= tabla;

    let jsonConect ={  // Json a enviar por el endpoint
      server:this.serverActual,
      username:this.userActual,
      pasw:this.paswActual,
      database:this.databaseActual,
      esquema: this.schemaActual,
      table:this.tablaActual
    }

    return this.http.put("http://localhost:3000/obtenerPrivilegiosTablas",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          swal('Privilegios de tabla...', JSON.stringify(success), 'info');
         // this.listaTablas= success;
          console.log("privile obtenidos: ",success);
        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )
  }


  obtenerPrivilegiosColumnas(tabla){
    this.tablaActual= tabla;
    console.log(tabla);

    let jsonConect ={  // Json a enviar por el endpoint
      server:this.serverActual,
      username:this.userActual,
      pasw:this.paswActual,
      database:this.databaseActual,
      esquema: this.schemaActual,
      table:this.tablaActual
    }

    return this.http.put("http://localhost:3000/obtenerPrivilegiosColumnas",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          swal('Privilegios de columnas de tabla...', JSON.stringify(success), 'info');
         // this.listaTablas= success;
          console.log("privile obtenidos: ",success);
        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /conectarNodo.", 'error');
        console.log("Error ",err);
      }
    )



  }


















  // Para realizar una consulta cuialquiera a una base de datos en especifico  .... aun no hecha ... >>:v NO TOCAR
  ConsultaQuery(server,user,pasw,db,dblink){
    console.log("ejecuta consulta query");
    console.log(" ---- "+ this.queryUser);
  }





}

