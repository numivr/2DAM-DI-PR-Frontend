import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/Respuesta';

@Injectable({
  providedIn: 'root',
})
export class RespuestaService {
  private apiUrl = '/api/respuestas';

  constructor(private http: HttpClient) {}

  obtenerRespuestas(preguntaId: number): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${this.apiUrl}/pregunta/${preguntaId}`);
  }

  obtenerRespuestaCorrecta(preguntaId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/correcta/${preguntaId}`, { responseType: 'text' });
  }
}
