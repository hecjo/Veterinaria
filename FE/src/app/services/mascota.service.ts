import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private urlApp: string = environment.endpoint
  private urlApi: string = 'api/Mascota/'

  constructor(private http: HttpClient) { }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.urlApp}${this.urlApi}`);
  }

  getMascota(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.urlApp}${this.urlApi}${id}`);
  }

  deleteMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApp}${this.urlApi}${id}`);
  }

  addMascota(mascota: Mascota): Observable<Mascota>{
    return this.http.post<Mascota>(`${this.urlApp}${this.urlApi}`, mascota);
  }

  updateMascota(id: number, mascota: Mascota): Observable<void>{
    return this.http.put<void>(`${this.urlApp}${this.urlApi}${id}`, mascota)
  }
}