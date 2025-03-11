import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { Jugador } from '../models/Jugador';

    @Injectable({
      providedIn: 'root'
    })
    export class JugadorService {
      private apiUrl = '/api/jugadores';

      constructor(private http: HttpClient) {}

      obtenerNombre(id: number): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/${id}/nombre`);
      }

      obtenerPuntuacion(id: number): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/${id}/puntuacion`);
      }

      obtenerJugadores(): Observable<Jugador[]> {
        return this.http.get<Jugador[]>(this.apiUrl);
      }

      obtenerTop5Jugadores(): Observable<Jugador[]> {
        return this.http.get<Jugador[]>(`${this.apiUrl}/top5`);
      }

      guardarJugador(nombre: string, puntos: number): Observable<Jugador> {
        const jugador: Partial<Jugador> = { nombre, puntos };
        return this.http.post<Jugador>(this.apiUrl, jugador);
      }
    }
