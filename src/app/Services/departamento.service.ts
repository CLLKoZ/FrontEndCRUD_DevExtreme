import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../Interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endpoint: string = environment.endPoint;
  private apiURL: string = this.endpoint + "departamento/"

  constructor(private http:HttpClient) { 
    
  }

  getList():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.apiURL}lista`)
  }
}
