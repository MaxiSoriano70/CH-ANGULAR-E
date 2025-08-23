import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Sesion } from '../../app/ngrx/sesion/sesion.model';
import { map, take } from 'rxjs/operators';

export function ruteoGuard(rolesPermitidos: string[] = []): CanActivateFn {
  return () => {
    const store = inject(Store<{ sesion: Sesion }>);
    const router = inject(Router);

    return store.select(state => state.sesion.usuarioLogueado).pipe(
      take(1),
      map(usuario => {
        if (!usuario) {
          router.navigate(['/']);
          return false;
        }
        if (rolesPermitidos.length && !rolesPermitidos.includes(usuario.role)) {
          router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  };
}
