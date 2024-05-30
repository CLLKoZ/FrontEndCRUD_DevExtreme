import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endpoint: string = environment.endPoint;
  private apiURL: string = this.endpoint + "empleado/"

  constructor(private http:HttpClient) { 
    
  }

  getList():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiURL}lista`)
  }

  add(modelo:Empleado):Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiURL}crear`, modelo)
  }

  update(idEmpleado: number, modelo: Empleado):Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiURL}actualizar/${idEmpleado}`, modelo)
  }

  delete(idEmpleado: number):Observable<void> {
    return this.http.delete<void>(`${this.apiURL}eliminar/${idEmpleado}`)
  }
}
