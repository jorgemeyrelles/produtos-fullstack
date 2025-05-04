import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProdutoStateService } from '../../../services/stores/produto-state.service';
import { ApiUrlService } from '../../../services/apis/api-urls.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, RouterLink],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css',
})
export class EditarProdutoComponent {
  categorias: any[] = [];
  produtoForm: FormGroup;
  mostrarModalSucesso: boolean = false;
  mostrarModalErro: boolean = false;
  produto: any;
  isLoading: boolean = false;

  constructor(
    private produtoState: ProdutoStateService,
    private http: HttpClient,
    private fb: FormBuilder,
    private apiUrlService: ApiUrlService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      categoriaId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.produto = this.produtoState.getProdutoSelecionado();
    if (this.produto) {
      this.produtoForm.patchValue({
        ...this.produto,
        categoriaId: this.produto.categoria.id,
      });
    } else {
      const id = window.location.pathname.split('/').pop();
      this.http.get(this.apiUrlService.getProdutoPorIdUrl(id!)).subscribe({
        next: (data: any) => {
          this.produto = data;
          this.produtoForm.patchValue({
            ...this.produto,
            categoriaId: this.produto.categoria.id,
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erro ao buscar produto:', err);
        },
      });
    }

    this.http.get(this.apiUrlService.getCategoriasUrl()).subscribe({
      next: (data: any) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  editarProduto(): void {
    if (this.produtoForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;

    const id = window.location.pathname.split('/').pop();

    this.http
      .put(this.apiUrlService.putProdutoUrl(id!), this.produtoForm.value, {
        responseType: 'text',
      })
      .subscribe({
        next: (value: any) => {
          this.produtoForm.reset();
          setTimeout(() => {
            this.mostrarModalSucesso = true;
          }, 500);
        },
        error: (err) => {
          console.error('Erro ao editar produto:', err);
          setTimeout(() => {
            this.mostrarModalErro = true;
          }, 500);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  fecharModalSucesso(): void {
    this.mostrarModalSucesso = false;
  }

  fecharModalErro(): void {
    this.mostrarModalErro = false;
  }

  get nome() {
    return this.produtoForm.get('nome');
  }

  get preco() {
    return this.produtoForm.get('preco');
  }

  get quantidade() {
    return this.produtoForm.get('quantidade');
  }

  get categoriaId() {
    return this.produtoForm.get('categoriaId');
  }
}
