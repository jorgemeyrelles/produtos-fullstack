import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Importação adicionada
import * as bootstrap from 'bootstrap'; // Importação do Bootstrap adicionada
import { ProdutoStateService } from '../../../services/stores/produto-state.service';
import { ApiUrlService } from '../../../services/apis/api-urls.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProdutosSelectors from '../../../store/produtos/selectors/produtos.selectors';
import { ProdutosActions } from '../../../store/produtos/actions/produtos.actions';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-consultar-produtos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LoadingComponent], // RouterLink adicionado aos imports
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css',
})
export class ConsultarProdutosComponent implements OnInit {
  produtos$: Observable<any[]>;
  produtosPaginados$: Observable<any[]>;
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  totalPaginas: number = 0;
  paginas: number[] = [];
  produtoIdParaExcluir: number | null = null;
  mensagemResultado: string = '';
  isLoading$: Observable<boolean>;
  categorias$: Observable<string[]>;
  categoriaSelecionada: string = ''; // Categoria selecionada para o filtro

  constructor(private router: Router, private store: Store) {
    this.produtos$ = this.store.select(ProdutosSelectors.selectAllProdutos);
    this.produtosPaginados$ = this.produtos$.pipe(
      map((produtos) => {
        const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        return produtos.slice(inicio, fim);
      })
    );
    this.isLoading$ = this.store.select(
      ProdutosSelectors.selectProdutosLoading
    );
    this.categorias$ = this.store.select(ProdutosSelectors.selectCategorias);
  }

  ngOnInit(): void {
    this.buscarProdutos();

    this.produtos$.subscribe((produtos) => {
      this.totalPaginas = Math.ceil(produtos.length / this.itensPorPagina);
      this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    });
  }

  buscarProdutos(): void {
    this.store.dispatch(ProdutosActions.loadProdutos());
  }

  editarProduto(produto: any): void {
    this.store.dispatch(ProdutosActions.selectProduto({ produto }));
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
      this.store.dispatch(
        ProdutosActions.deleteProduto({ id: this.produtoIdParaExcluir })
      );
      const modalElement = document.getElementById('modalConfirmacao');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      combineLatest([
        this.store.select(ProdutosSelectors.selectProdutosLoading),
        this.store.select(ProdutosSelectors.selectProdutosError),
      ]).subscribe(([loading, error]) => {
        if (!loading) {
          if (error) {
            this.mensagemResultado = `Erro ao excluir o produto: ${error}`;
          } else {
            this.mensagemResultado = `Produto com ID ${this.produtoIdParaExcluir} foi excluído com sucesso.`;
          }

          const modalResultadoElement =
            document.getElementById('modalResultado');
          if (modalResultadoElement) {
            const modalResultado = new bootstrap.Modal(modalResultadoElement);
            modalResultado.show();
          }
        }
      });
    }
  }

  // excluirProduto(id: number | string): void {
  //   const idFormatado = typeof id === 'string' ? id.trim() : id;

  //   this.isLoading = true;

  //   this.http
  //     .delete(this.apiUrlService.deleteProdutoUrl(idFormatado))
  //     .subscribe({
  //       next: () => {
  //         console.log(`Produto com ID ${idFormatado} excluído com sucesso.`);
  //         this.mensagemResultado = `Produto com ID ${idFormatado} foi excluído com sucesso.`; // Mensagem de sucesso
  //         this.buscarProdutos(); // Atualiza a lista após exclusão

  //         const modalResultadoElement =
  //           document.getElementById('modalResultado'); // Exibe o modal de resultado
  //         if (modalResultadoElement) {
  //           const modalResultado = new bootstrap.Modal(modalResultadoElement);
  //           modalResultado.show();
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Erro ao excluir produto:', err);
  //         this.mensagemResultado = 'Erro ao excluir o produto.';

  //         const modalResultadoElement =
  //           document.getElementById('modalResultado');
  //         if (modalResultadoElement) {
  //           const modalResultado = new bootstrap.Modal(modalResultadoElement);
  //           modalResultado.show();
  //         }
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       },
  //     });
  // }

  // atualizarPaginacao(novaPagina: number) {
  //   this.totalPaginas = Math.ceil(this.produtos.length / this.itensPorPagina);
  //   this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  //   const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
  //   const fim = inicio + this.itensPorPagina;
  //   this.produtosPaginados = this.produtos.slice(inicio, fim);
  // }

  alterarPagina(novaPagina: number) {
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas) {
      this.paginaAtual = novaPagina;
      this.produtosPaginados$ = this.produtos$.pipe(
        map((produtos) => {
          const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
          const fim = inicio + this.itensPorPagina;
          return produtos.slice(inicio, fim);
        })
      );
    }
  }

  filtrarPorCategoria(): void {
    if (this.categoriaSelecionada) {
      this.produtosPaginados$ = this.store
        .select(
          ProdutosSelectors.selectProdutosFiltradosPorCategoria(
            this.categoriaSelecionada
          )
        )
        .pipe(
          map((produtos) => {
            this.totalPaginas = Math.ceil(
              produtos.length / this.itensPorPagina
            );
            this.paginas = Array.from(
              { length: this.totalPaginas },
              (_, i) => i + 1
            );
            this.paginaAtual = 1; // Reseta para a primeira página ao aplicar filtro
            return produtos.slice(0, this.itensPorPagina);
          })
        );
    } else {
      this.produtosPaginados$ = this.produtos$.pipe(
        map((produtos) => {
          const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
          const fim = inicio + this.itensPorPagina;
          return produtos.slice(inicio, fim);
        })
      );
    }
  }
}
