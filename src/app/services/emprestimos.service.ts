import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Emprestimo } from '../models/emprestimo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {

  API = "http://localhost:8080/api/emprestimo";
  http = inject(HttpClient);

  constructor() { }

  save(emprestimo: Emprestimo): Observable<String>{
    return this.http.post<String>(this.API+"/save", emprestimo, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Emprestimo>{
    return this.http.get<Emprestimo>(this.API+"/findById/"+id);
  }

  findAll(): Observable<Emprestimo[]>{
    return this.http.get<Emprestimo[]>(this.API+"/findAll");
  }

  update(emprestimo: Emprestimo): Observable<String>{
    return this.http.put<String>(this.API+"/update/"+emprestimo.id, emprestimo, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }
}
