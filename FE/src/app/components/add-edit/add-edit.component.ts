import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  //variable para cambiar entre editar y agregar
  id!: number;
  operacion: string = 'Agregar';
  
  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, 
      private _mascotaService: MascotaService,
      //manejo de rutas
      private router: Router,
      // para poder cambiar entre editar y eliminar
      private aroute: ActivatedRoute)
  { 
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      raza: ['',Validators.required],
      edad: ['',Validators.required],
      color: ['',Validators.required],
      peso: ['',Validators.required]
    })

    this.id = Number(this.aroute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0){
      this.operacion = "Editar"
      this.obtenerMascota(this.id)
    }
  }
  //Metodo para obtener los datos de un registro en especifico.
  obtenerMascota(id: number) {
    this._mascotaService.getMascota(id).subscribe(data => {
      //metodos para mostrar valores en los formularios patchValue (no son obligatorios todos los campos) y setValue
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        edad: data.edad,
        color: data.color,
        peso: data.peso
      })
    })
  }

  agregarEditMascota() {

    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      edad: this.form.value.edad,
      raza: this.form.value.raza,
      color: this.form.value.color,
      peso: this.form.value.peso
    }

    if( this.id == 0){
      this.agregarMascota (mascota);
    }else{
      mascota.idmascota = this.id
      this.editarMascota(this.id, mascota);
    }
    
    
  }

  agregarMascota (mascota: Mascota){
    this._mascotaService.addMascota(mascota).subscribe(data =>{
      this._snackBar.open("La mascota fue Agregada",'',{duration: 2500});
      this.router.navigate(['/listado']);
    //Manejo de rutas 
  });
  }
  editarMascota(id: number, mascota: Mascota){
    this._mascotaService.updateMascota(id, mascota).subscribe(data =>{
      this._snackBar.open("La mascota fue Actualiza",'',{duration: 2500});
      this.router.navigate(['/listado']);
    })
  }
}
