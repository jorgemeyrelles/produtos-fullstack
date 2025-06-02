import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProdutos from '../reducers/produtos.reducer';
import { ProdutoState } from '../produto.model';

export const selectProdutosState =
  createFeatureSelector<ProdutoState>('produtos');

export const selectAllProdutos = createSelector(
  selectProdutosState,
  (state: ProdutoState) => state.produtos
);

export const selectProdutoSelecionado = createSelector(
  selectProdutosState,
  (state: ProdutoState) => state.produtoSelecionado
);

export const selectProdutosLoading = createSelector(
  selectProdutosState,
  (state: ProdutoState) => state.isLoading
);
export const selectProdutosError = createSelector(
  selectProdutosState,
  (state: ProdutoState) => state.error
);
export const selectProdutosPaginados = (
  pagina: number,
  itensPorPagina: number
) =>
  createSelector(selectAllProdutos, (produtos: ProdutoState['produtos']) => {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return produtos.slice(inicio, fim);
  });

export const selectCategorias = createSelector(
  selectAllProdutos,
  (produtos: ProdutoState['produtos']) => {
    return [...new Set(produtos.map((produto) => produto.categoria.nome))];
  }
);

export const selectProdutosFiltradosPorCategoria = (categoria: string) =>
  createSelector(selectAllProdutos, (produtos: ProdutoState['produtos']) => {
    if (!categoria) return produtos;
    return categoria
      ? produtos.filter((produto) => produto.categoria.nome === categoria)
      : produtos;
  });
