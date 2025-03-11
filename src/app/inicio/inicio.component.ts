import { Component, OnInit } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { Router } from '@angular/router';
    import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
    import { JugadorService } from '../services/JugadorService';
    import { Jugador } from '../models/Jugador';
import {CommonModule} from "@angular/common";

    @Component({
      selector: 'app-inicio',
      templateUrl: './inicio.component.html',
      styleUrls: ['./inicio.component.scss'],
      imports: [
        IonContent,
        IonInput,
        IonButton,
        IonList,
        IonLabel,
        IonItem,
        FormsModule,
        CommonModule
      ]
    })
    export class InicioComponent implements OnInit {
      userName: string = '';
      top5Jugadores: Jugador[] = [];

      constructor(private router: Router, private jugadorService: JugadorService) {}

      ngOnInit() {
        this.jugadorService.obtenerTop5Jugadores().subscribe(jugadores => {
          this.top5Jugadores = jugadores;
        });
      }

      startQuiz() {
        if (this.userName.trim()) {
          this.jugadorService.obtenerJugadores().subscribe(jugadores => {
            const existingNames = jugadores.map(jugador => jugador.nombre);
            if (existingNames.includes(this.userName.trim())) {
              alert('El nombre ya existe, por favor elige otro nombre');
            } else {
              this.router.navigate(['/speedquiz', this.userName.trim()]);
            }
          });
        } else {
          alert('Por favor ingresa tu nombre');
        }
      }
    }
