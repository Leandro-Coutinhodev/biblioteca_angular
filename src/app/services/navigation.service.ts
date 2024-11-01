import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  router = inject(Router);

  constructor() { }

  redirecionar(rota: string, tempo: number = 0){
    if(tempo > 0){
      setTimeout(() => this.router.navigate([rota]).then(() => 
      window.location.reload()), tempo);
    }else {
      this.router.navigate([rota]).then(() => 
        window.location.reload())
    }
  }
}
