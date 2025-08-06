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
    },
    {
        path: RoutePaths.ALUMNODETALLE,
        loadComponent: () =>
        import('./features/alumnos/view-student/view-student.component').then(m => m.ViewStudentComponent)
    },
    {
    path: RoutePaths.ERROR404,
    loadComponent: () =>
        import('./features/error404/error404.component').then(m => m.Error404Component)
    },
    {
        path: '**',
        redirectTo: RoutePaths.ERROR404
    }
];
