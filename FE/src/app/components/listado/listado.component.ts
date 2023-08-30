import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

// const listMascota: Mascota[] = [
//   {id: 1, nombre:'ban' , edad: 1, raza: 'peludo', color:'marron', peso: 5},
//   {id: 2, nombre:'nuci' , edad: 2, raza: 'peludo', color:'cafe', peso: 6},
//   {id: 3, nombre:'spay' , edad: 2, raza: 'pitbull', color:'blanco', peso: 15}
// ];

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Nombre', 'Edad', 'Raza', 'Color', 'Peso', 'Acciones'];
  dataSource = new MatTableDataSource<Mascota>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, 
              private _mascotaService: MascotaService ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel='Items por página'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(id:number) {
    this._mascotaService.deleteMascota(id).subscribe(() =>{
      this._snackBar.open("La mascota fue eliminada",'',
      {duration: 1500
      });
      this.obtenerMascotas();
    })
  }

  obtenerMascotas(){
    this._mascotaService.getMascotas().subscribe({
    next: (data) => {
      this.dataSource.data = data;
    },
    error: (e) => alert("Ocurrio un error. " + e),
    complete: () => console.info('complete') 
    });
  }
}