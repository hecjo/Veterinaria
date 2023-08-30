import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Compnentes
import { ListadoComponent } from './components/listado/listado.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { VerComponent } from './components/ver/ver.component';

const routes: Routes = [
  //Rutas

  {path: '', redirectTo: 'listado', pathMatch: 'full'},
  {path: 'listado', component: ListadoComponent },
  {path: 'add', component: AddEditComponent},
  {path: 'ver/:id', component: VerComponent },
  {path: 'edit/:id', component: AddEditComponent},


  {path: '**', redirectTo: 'listado', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
