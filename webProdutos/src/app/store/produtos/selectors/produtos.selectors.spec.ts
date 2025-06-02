import * as fromProdutos from '../reducers/produtos.reducer';
import { selectProdutosState } from './produtos.selectors';

describe('Produtos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProdutosState({
      [fromProdutos.produtosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
