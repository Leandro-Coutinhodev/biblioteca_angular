import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutoresserviceService {

  API = "http://localhost:8080/api/autor";
  http = inject(HttpClient);
  constructor() { }


  save(autor: Autor): Observable<String>{
    return this.http.post<String>(this.API+"/save", autor, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Autor>{
    return this.http.get<Autor>(this.API+"/findById/"+id);
  }

  findAll(): Observable<Autor[]>{
    return this.http.get<Autor[]>(this.API+"/findAll");
  }

  update(autor: Autor): Observable<String>{
    return this.http.put<String>(this.API+"/update/"+autor.id, autor, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }
}
