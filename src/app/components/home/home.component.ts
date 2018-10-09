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
  resultadoQuery:Array<string>=[];

    // Variables NgModel ...
   ipServer:string="localhost";
   user:string ="postgres";
   pasw:string="alvarado";
   database:string='proyectoBases';
   queryUser:string= "'select id from paises where nombre = ''Italia''')  as pais (id int);";


   queryDistr:string="select e_sc.carnet,nombre,apellido1,apellido2,e_sc.estado  from 	estudiantes as e_sc  inner join  (select * from dblink('conn',  'select * from estudiantes') as  est_cartago (carnet	int,nombre	varchar(50), apellido1	varchar(50))) as e_ca on e_sc.carnet=e_ca.carnet;";

   conn:string='conn';
   numConexion=0;


   // Variables de datos para verificar con la conexion actual.
   connDBlinkActual:string;
   serverActual:string;
   userActual:string;
   paswActual:string;
   databaseActual:string;
   schemaActual:string;
   tablaActual:string;

   nuevoNodo:any; // variable guarda objeto nodo creado


  pruebaNodo(){  // Metodo para conectar nodos de base de datos, mediante DBlink
    this.nuevoNodo = new nodo( this.ipServer,this.user,this.pasw, this.database );
    this.resultadoQuery=[];
    this.numConexion++;
    let newConn= this.conn+this.numConexion; // conn0 , conn1, conn2

    let jsonConect ={    // Json a enviar por el endpoint
      server:this.ipServer,
      username:this.user,
      pasw:this.pasw,
      database:this.database,
      conn: newConn
    }

    return this.http.put("http://localhost:3000/conectarNodo",jsonConect)
    .subscribe(
      success => {
        if(success == true){
          swal('Correcto...', "Ingreso Exitoso.", 'success');
          document.getElementById("closemodal").click();
          this.listaNodo.push(this.nuevoNodo);
          this.listaSchemas={};
          this.listaTablas={};

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
   this.connDBlinkActual= dblink;
   this.resultadoQuery=[];

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
       swal('Incorrecto...', "Error de conexion con endpoint /obtenerSchemas.", 'error');
        console.log("Error ",err);
      }
    )
  }




  obtenerTablas(esquema){
    this.schemaActual= esquema;

    let jsonConect ={  // Json a enviar por el endpoint
      server:this.serverActual,
      username:this.userActual,
      pasw:this.paswActual,
      database:this.databaseActual,
      esquema: this.schemaActual
    }
    this.resultadoQuery=[];

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
       swal('Incorrecto...', "Error de conexion con endpoint /obtenerTablas.", 'error');
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
    this.resultadoQuery=[];

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
       swal('Incorrecto...', "Error de conexion con endpoint /obtenerPrivilegiosTablas.", 'error');
        console.log("Error ",err);
      }
    )
  }


  obtenerPrivilegiosColumnas(tabla){
    this.tablaActual= tabla;
    console.log(tabla);
    this.resultadoQuery=[];

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


    let queryFinal= "select * from dblink('host="+ server +" user="+ user+" password="+pasw+" dbname="+db+"',"+this.queryUser;
    console.log("Query final a enviar inicia asi: ",queryFinal );
    console.log("--");

    let jsonConect ={  // Json a enviar por el endpoint
      queryF:queryFinal
    }
    this.resultadoQuery=[];

    return this.http.put("http://localhost:3000/enviarQuery",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          this.listaSchemas={};
          this.listaTablas={};
          swal('Eejcucion de query ...', JSON.stringify(success), 'info');
          //this.resultadoQuery= success;

          var tam= success.length;
          for(var i=0; i<tam; i++){
            var p:string= JSON.stringify(success[i]);
            this.resultadoQuery.push(p);
          }

        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /enviarQuery.", 'error');
        console.log("Error ",err);
      }
    )


  }






  consultaDistribuida(){

    let jsonConect ={  // Json a enviar por el endpoint
      query:this.queryDistr
    }

    return this.http.put("http://localhost:3000/enviarQueryDistrib",jsonConect)
    .subscribe(
      success => {
        if(success == false){
          swal('Incorecto...', "Error", 'error');
        }else{
          this.resultadoQuery=[];
          this.listaSchemas={};
          this.listaTablas={};
          swal('Ejcucion de query ...', JSON.stringify(success), 'info');


          var tam= success.length;
          for(var i=0; i<tam; i++){
            var p:string= JSON.stringify(success[i]);
            this.resultadoQuery.push(p);
          }

        }
      },
      err => {
       swal('Incorrecto...', "Error de conexion con endpoint /enviarQueryDistrib.", 'error');
        console.log("Error ",err);
      }
    )

  }





}

