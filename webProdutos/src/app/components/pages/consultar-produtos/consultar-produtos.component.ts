import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Importação adicionada
import * as bootstrap from 'bootstrap'; // Importação do Bootstrap adicionada
import { ProdutoStateService } from '../../../services/stores/produto-state.service';
import { ApiUrlService } from '../../../services/apis/api-urls.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-produtos',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, FormsModule], // RouterLink adicionado aos imports
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css',
})
export class ConsultarProdutosComponent implements OnInit {
  produtos: any[] = []; // Lista completa de produtos
  produtosPaginados: any[] = []; // Produtos exibidos na página atual
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];
  produtoIdParaExcluir: number | null = null;
  mensagemResultado: string = '';
  isLoading: boolean = false;
  categorias: string[] = []; // Lista de categorias disponíveis
  categoriaSelecionada: string = ''; // Categoria selecionada para o filtro

  constructor(
    private produtoState: ProdutoStateService,
    private router: Router,
    private http: HttpClient,
    private apiUrlService: ApiUrlService // Injetando o serviço de URLs
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrlService.getProdutosUrl()).subscribe({
      next: (data) => {
        this.produtos = data;
        this.categorias = [
          ...new Set(data.map((produto) => produto.categoria.nome)),
        ]; // Obtém categorias únicas
        this.atualizarPaginacao();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  editarProduto(produto: any): void {
    this.produtoState.setProdutoSelecionado(produto);
    this.router.navigate(['/pages/editar-produto', produto.id]);
  }

  abrirModalConfirmacao(produtoId: number): void {
    this.produtoIdParaExcluir = produtoId;
    const modalElement = document.getElementById('modalConfirmacao');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmarExclusao(): void {
    if (this.produtoIdParaExcluir !== null) {
      this.excluirProduto(this.produtoIdParaExcluir);
      const modalElement = document.getElementById('modalConfirmacao');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }

  excluirProduto(id: number | string): void {
    const idFormatado = typeof id === 'string' ? id.trim() : id;

    this.isLoading = true;

    this.http
      .delete(this.apiUrlService.deleteProdutoUrl(idFormatado))
      .subscribe({
        next: () => {
          console.log(`Produto com ID ${idFormatado} excluído com sucesso.`);
          this.mensagemResultado = `Produto com ID ${idFormatado} foi excluído com sucesso.`; // Mensagem de sucesso
          this.buscarProdutos(); // Atualiza a lista após exclusão

          const modalResultadoElement =
            document.getElementById('modalResultado'); // Exibe o modal de resultado
          if (modalResultadoElement) {
            const modalResultado = new bootstrap.Modal(modalResultadoElement);
            modalResultado.show();
          }
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
          this.mensagemResultado = 'Erro ao excluir o produto.';

          const modalResultadoElement =
            document.getElementById('modalResultado');
          if (modalResultadoElement) {
            const modalResultado = new bootstrap.Modal(modalResultadoElement);
            modalResultado.show();
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  atualizarPaginacao() {
    this.totalPaginas = Math.ceil(this.produtos.length / this.itensPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.produtosPaginados = this.produtos.slice(inicio, fim);
  }

  alterarPagina(novaPagina: number) {
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas) {
      this.paginaAtual = novaPagina;
      this.atualizarPaginacao();
    }
  }

  filtrarPorCategoria(): void {
    if (this.categoriaSelecionada) {
      const produtosFiltrados = this.produtos.filter(
        (produto) => produto.categoria.nome === this.categoriaSelecionada
      );
      this.produtosPaginados = produtosFiltrados.slice(0, this.itensPorPagina);
      this.totalPaginas = Math.ceil(
        produtosFiltrados.length / this.itensPorPagina
      );
      this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
      this.paginaAtual = 1;
    } else {
      this.atualizarPaginacao();
    }
  }
}
