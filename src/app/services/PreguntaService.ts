import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreguntaService {
  private apiUrl = '/api/preguntas'; // URL base del backend usando proxy

  constructor(private http: HttpClient) {}

  // Obtener enunciado de una pregunta por ID
  obtenerEnunciado(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

}
