import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  mergeMap,
} from 'rxjs/operators';
import { Observable, EMPTY, of, merge } from 'rxjs';
import { ProdutosActions } from '../actions/produtos.actions';
import { Produto } from '../produto.model';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from '../../../services/apis/api-urls.service';

@Injectable()
export class ProdutosEffects {
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private apiUrlService: ApiUrlService
  ) {}

  loadProdutoss$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProdutosActions.loadProdutos),
      switchMap(() => {
        return this.http
          .get<Produto[]>(this.apiUrlService.getProdutosUrl())
          .pipe(
            map((produtos) =>
              ProdutosActions.loadProdutosSuccess({
                produtos: produtos as any[],
              })
            ),
            catchError((error) =>
              of(
                ProdutosActions.loadProdutosFailure({
                  error: error.message || 'Erro ao carregar produtos',
                })
              )
            )
          );
      })
    );
  });

  deleteProduto$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ProdutosActions.deleteProduto),
      mergeMap(({ id }) => {
        return this.http.delete(this.apiUrlService.getProdutoPorIdUrl(id)).pipe(
          map(() => ProdutosActions.deleteProdutoSuccess({ id })),
          catchError((error) => {
            return of(
              ProdutosActions.deleteProdutoFailure({
                error: error.message || 'Erro ao deletar produto',
              })
            );
          })
        );
      })
    );
  });
}
