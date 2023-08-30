import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit{

  id: number;
  // mascota!: Mascota;

  //observable lleva $ al final 
  mascota$!: Observable<Mascota>;

  constructor(private _mascotaService: MascotaService,
    private aRoute: ActivatedRoute) {
      //Una opcion de obtener el id
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));          
  }

  ngOnInit(): void {
    // this.obtenerMascota();
    this.mascota$ = this._mascotaService.getMascota(this.id)
  }

  // obtenerMascota() {
  //   this._mascotaService.getMascota(this.id).subscribe(data => {
  //   this.mascota = data;
  //   console.log(data);
  //   });
  // }
}
