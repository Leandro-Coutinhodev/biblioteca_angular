import { Routes } from '@angular/router';
import { MenuComponent } from './components/layout/menu/menu.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { MainComponent } from './components/layout/main/main/main.component';
import { LivrosformComponent } from './components/livros/livrosform/livrosform.component';
import { AutoreslistComponent } from './components/autores/autoreslist/autoreslist.component';
import { AutoresformComponent } from './components/autores/autoresform/autoresform.component';
import { UsuarioslistComponent } from './components/usuarios/usuarioslist/usuarioslist.component';
import { UsuariosformComponent } from './components/usuarios/usuariosform/usuariosform.component';
import { EmprestimoslistComponent } from './components/emprestimos/emprestimoslist/emprestimoslist.component';
import { EmprestimosformComponent } from './components/emprestimos/emprestimosform/emprestimosform.component';
import { HomeComponent } from './components/home/home/home.component';

export const routes: Routes = [
  {path: "", redirectTo: "admin/home", pathMatch:'full'},
  {path: "admin", component: MainComponent, children:[
    {path: "home", component: HomeComponent},
    {path: "livros", component: LivroslistComponent},
    {path: "livros/new", component: LivrosformComponent},
    {path: "livros/edit/:id", component: LivrosformComponent},
    {path: "autores", component: AutoreslistComponent},
    {path: "autores/new", component: AutoresformComponent},
    {path: "autores/edit/:id", component: AutoresformComponent},
    {path: "usuarios", component: UsuarioslistComponent},
    {path: "usuarios/new", component: UsuariosformComponent},
    {path: "usuarios/edit/:id", component: UsuariosformComponent},
    {path: "emprestimos", component: EmprestimoslistComponent},
    {path: "emprestimos/new", component: EmprestimosformComponent},
    {path: "emprestimos/edit/:id", component: EmprestimosformComponent}

  ]}
];
