import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoutePaths } from '../shared/routes';
import { AlumnosComponent } from './features/alumnos/alumnos.component';
import { CursosComponent } from './features/cursos/cursos.component';

export const routes: Routes = [
    {
        path: RoutePaths.HOME,
        component: HomeComponent
    },
    {
        path: RoutePaths.ALUMNOS,
        component: AlumnosComponent
    },
    {
        path: RoutePaths.CURSOS,
        component: CursosComponent
    }
];
