import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoStateService {
  private produtoSelecionado: any = null;
  constructor() {}

  // Define o produto selecionado
  setProdutoSelecionado(produto: any): void {
    this.produtoSelecionado = produto;
  }

  // Obtém o produto selecionado
  getProdutoSelecionado(): any {
    return this.produtoSelecionado;
  }

  // Limpa o produto selecionado
  clearProdutoSelecionado(): void {
    this.produtoSelecionado = null;
  }
}
