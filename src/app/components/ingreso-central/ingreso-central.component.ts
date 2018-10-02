import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs";
//import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';

import swal from'sweetalert2';


@Component({
  selector: 'app-ingreso-central',
  templateUrl: './ingreso-central.component.html',
  styleUrls: ['./ingreso-central.component.css']
})
export class IngresoCentralComponent  {

  constructor( private router:Router) { }

   ipServer:string="localhost";
   user:string ="Wilfred";
   pasw:string="123456789";
   public datos:any;


   conect() {
    swal('Correcto...', "Ingreso Exitoso.", 'success');
     console.log("Conecta");
     document.getElementById("closemodal").click();
     this.router.navigate(['home']);  // redirecciona a ruta
   }




}
