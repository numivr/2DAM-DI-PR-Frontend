import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {PreguntaService} from '../services/PreguntaService';
import {RespuestaService} from '../services/RespuestaService';
import {Respuesta} from '../models/Respuesta';
import {IonButton, IonContent, AlertController} from "@ionic/angular/standalone";
import {CommonModule, NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import {JugadorService} from '../services/JugadorService';

@Component({
  selector: 'app-speed-quiz',
  templateUrl: './speed-quiz.component.html',
  imports: [
    IonButton,
    CommonModule,
    NgForOf,
    IonContent
  ],
  styleUrls: ['./speed-quiz.component.scss']
})
export class SpeedQuizComponent implements OnInit, OnDestroy {
  indicePregunta = 1;
  puntos = 0;
  timer = 20;
  interval: any;
  pregunta: string = '';
  respuestas: Respuesta[] = [];
  respuestaCorrecta: string = '';
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService,
    private jugadorService: JugadorService,
    private alertController: AlertController, // Inject the AlertController
    private router: Router, // Inject the Router
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName') || '';
    console.log('UserName retrieved from route:', this.userName); // Add this line
    this.cargarPregunta();
    this.iniciarTemporizador();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async cargarPregunta() {
    if (this.indicePregunta > 20) {
      this.guardarJugador();
      await this.mostrarFelicitacion();
      return;
    }

    this.preguntaService.obtenerEnunciado(this.indicePregunta).subscribe((preg: string) => {
      this.pregunta = preg;
      console.log('Pregunta obtenida:', this.pregunta);

      this.respuestaService.obtenerRespuestas(this.indicePregunta).subscribe((resp: Respuesta[]) => {
        console.log('Respuestas obtenidas:', resp);
        this.respuestas = resp;
        console.log('Respuestas después de asignación:', this.respuestas);
      }, (error: any) => {
        console.error('Error obteniendo respuestas', error);
      });

      this.respuestaService.obtenerRespuestaCorrecta(this.indicePregunta).subscribe((respCorrecta: string) => {
        this.respuestaCorrecta = respCorrecta;
        console.log('Respuesta correcta obtenida:', this.respuestaCorrecta);
      });

    });
  }

  iniciarTemporizador() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.indicePregunta++;
        this.cargarPregunta();
        this.timer = 20;
      }
    }, 1000);
  }

  seleccionarRespuesta(respuesta: Respuesta) {
    console.log('Respuesta clickeada:', respuesta);
    console.log('Comparando con la respuesta correcta:', this.respuestaCorrecta);

    const textoRespuesta = String(respuesta).trim();
    const textoCorrecto = String(this.respuestaCorrecta).trim();

    console.log('Texto de respuesta clickeada:', textoRespuesta);
    console.log('Texto de respuesta correcta:', textoCorrecto);

    if (textoRespuesta === textoCorrecto) {
      console.log('🎉 Respuesta correcta!');
      this.puntos += 10;
    } else {
      console.log('❌ Respuesta incorrecta');
    }

    this.indicePregunta++;
    this.cargarPregunta();
    this.timer = 20;

  }

  async mostrarFelicitacion() {
    const alert = await this.alertController.create({
      header: '¡Felicidades, compii!',
      message: `Has conseguido ${this.puntos} puntos.`,
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();

    this.router.navigate(['/inicio']);
  }


  guardarJugador() {

    if (this.userName.trim()) {
      console.log('Guardando jugador:', this.userName, this.puntos);
      this.jugadorService.guardarJugador(this.userName, this.puntos).subscribe(
        response => console.log('Jugador guardado:', response),
        error => console.error('Error al guardar:', error)
      );
    } else {
      console.error('Error: userName está vacío');
    }
  }





}

