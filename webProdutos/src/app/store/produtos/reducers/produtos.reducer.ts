import { createFeature, createReducer, on } from '@ngrx/store';
import { ProdutosActions } from '../actions/produtos.actions';
import { ProdutoState } from '../produto.model';

export const produtosFeatureKey = 'produtos';

export const initialState: ProdutoState = {
  produtos: [],
  produtoSelecionado: null,
  isLoading: false,
  error: null,
};

export const produtosReducer = createReducer(
  initialState,
  on(ProdutosActions.loadProdutos, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ProdutosActions.loadProdutosSuccess, (state, { produtos }) => ({
    ...state,
    produtos,
    isLoading: false,
  })),
  on(ProdutosActions.loadProdutosFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(ProdutosActions.selectProduto, (state, { produto }) => ({
    ...state,
    produtoSelecionado: produto,
  })),
  on(ProdutosActions.clearSelectedProduto, (state) => ({
    ...state,
    produtoSelecionado: null,
  })),

  on(ProdutosActions.deleteProduto, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(ProdutosActions.deleteProdutoSuccess, (state, { id }) => ({
    ...state,
    produtos: state.produtos.filter((produto) => produto.id !== id),
    isLoading: false,
  })),
  on(ProdutosActions.deleteProdutoFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
