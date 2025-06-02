import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Produto } from '../produto.model';

export const ProdutosActions = createActionGroup({
  source: 'Produtos',
  events: {
    'Load Produtos': emptyProps(),
    'Load Produtos Success': props<{ produtos: Produto[] }>(),
    'Load Produtos Failure': props<{ error: string }>(),
    'Select Produto': props<{ produto: Produto }>(),
    'Clear Selected Produto': emptyProps(),
    'Delete Produto': props<{ id: number | string }>(),
    'Delete Produto Success': props<{ id: number | string }>(),
    'Delete Produto Failure': props<{ error: string }>(),
  },
});
