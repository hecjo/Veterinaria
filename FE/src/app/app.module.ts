
//Componentes
import { AppComponent } from './app.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { ListadoComponent } from './components/listado/listado.component';
import { VerComponent } from './components/ver/ver.component';


//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    ListadoComponent,
    VerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
