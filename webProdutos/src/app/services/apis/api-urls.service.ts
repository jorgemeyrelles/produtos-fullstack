import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlService {
  private readonly baseUrl = 'http://localhost:8081/api';

  // Produtos
  getProdutosUrl(): string {
    return `${this.baseUrl}/produtos`;
  }

  getProdutoPorIdUrl(id: number | string): string {
    return `${this.baseUrl}/produtos/${id}`;
  }

  deleteProdutoUrl(id: number | string): string {
    return `${this.baseUrl}/produtos/${id}`;
  }

  putProdutoUrl(id: number | string): string {
    return `${this.baseUrl}/produtos/${id}`;
  }

  postProdutoUrl(): string {
    return `${this.baseUrl}/produtos`;
  }

  // Categorias
  getCategoriasUrl(): string {
    return `${this.baseUrl}/categorias`;
  }
}
