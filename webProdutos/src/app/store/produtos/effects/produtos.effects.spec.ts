import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProdutosEffects } from './produtos.effects';

describe('ProdutosEffects', () => {
  let actions$: Observable<any>;
  let effects: ProdutosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProdutosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProdutosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
