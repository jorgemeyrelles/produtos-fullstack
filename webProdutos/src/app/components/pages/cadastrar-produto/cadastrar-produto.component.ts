import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiUrlService } from '../../../services/apis/api-urls.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
    selector: 'app-cadastrar-produto',
    imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
    templateUrl: './cadastrar-produto.component.html',
    styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent implements OnInit {
  categorias: any[] = [];
  produtoForm: FormGroup;
  mostrarModalSucesso: boolean = false;
  mostrarModalErro: boolean = false;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private apiUrlService: ApiUrlService // Injetando o serviço de URLs
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      categoriaId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Usando o método getCategoriasUrl do ApiUrlService
    this.http.get(this.apiUrlService.getCategoriasUrl()).subscribe({
      next: (data: any) => (this.categorias = data),
      error: (err) => console.error('Erro ao buscar categorias:', err),
    });
  }

  cadastrarProduto(): void {
    if (this.produtoForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;
    console.log(this.produtoForm.value);

    this.http
      .post(this.apiUrlService.postProdutoUrl(), this.produtoForm.value, {
        responseType: 'text',
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.produtoForm.reset();
          setTimeout(() => {
            this.mostrarModalSucesso = true;
          }, 500);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erro ao cadastrar produto:', err);
          setTimeout(() => {
            this.mostrarModalErro = true;
          }, 500);
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
