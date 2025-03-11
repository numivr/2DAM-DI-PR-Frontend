import { Routes } from '@angular/router';

    export const routes: Routes = [
      {
        path: 'inicio',
        loadComponent: () => import('./inicio/inicio.component').then((m) => m.InicioComponent),
      },
      { path: 'speedquiz/:userName',
        loadComponent: () => import('./speed-quiz/speed-quiz.component').then((m) => m.SpeedQuizComponent),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ];
