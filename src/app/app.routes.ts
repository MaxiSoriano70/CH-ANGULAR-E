import { Routes } from '@angular/router';
import { RoutePaths } from '../shared/routes';

export const routes: Routes = [
    {
        path: RoutePaths.HOME,
        loadComponent: () =>
        import('./features/alumnos/alumnos.component').then(m => m.AlumnosComponent)
    },
    {
        path: RoutePaths.CURSOS,
        loadComponent: () =>
        import('./features/cursos/cursos.component').then(m => m.CursosComponent)
    },
    {
        path: RoutePaths.INSCRIPCIONES,
        loadComponent: () =>
        import('./features/inscripciones/inscripciones.component').then(m => m.InscripcionesComponent)
    }
];
