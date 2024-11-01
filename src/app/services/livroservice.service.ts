import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroserviceService {

  API = "http://localhost:8080/api/livro";
  http = inject(HttpClient);

  constructor() { }

  save(livro: Livro): Observable<String>{
    return this.http.post<String>(this.API+"/save", livro, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Livro>{
    return this.http.get<Livro>(this.API+"/findById/"+id);
  }

  findAll(): Observable<Livro[]>{
    return this.http.get<Livro[]>(this.API+"/findAll");
  }

  update(livro: Livro): Observable<String>{
    return this.http.put<String>(this.API+"/update/"+livro.id, livro, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }
}
