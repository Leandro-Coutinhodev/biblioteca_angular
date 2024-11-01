import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API = "http://localhost:8080/api/usuario";
  http = inject(HttpClient);
  constructor() { }

  save(usuario: Usuario): Observable<String>{
    return this.http.post<String>(this.API+"/save", usuario, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+"/findById/"+id);
  }

  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+"/findAll");
  }

  update(usuario: Usuario): Observable<String>{
    return this.http.put<String>(this.API+"/update/"+usuario.id, usuario, {responseType: 'twxt' as 'json'});
  }

  delete(id: number): Observable<String>{
  return this.http.delete<String>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }
}
