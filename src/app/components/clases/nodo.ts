

// Calse para crear los objetos nodos, como las bases de datos con la que se quieren conectar
export class nodo {
  public server: string;
  public  username: string;
  public pasw: string;
  public database: string;

  constructor(server: string, username: string, pasw: string, database: string) {
    this.server= server;
    this.username=username;
    this.pasw= pasw;
    this.database= database;
   }

}
