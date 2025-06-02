import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { produtosReducer } from './store/produtos/reducers/produtos.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProdutosEffects } from './store/produtos/effects/produtos.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ produtos: produtosReducer }),
    provideEffects(ProdutosEffects),
  ],
};
