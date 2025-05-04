import { Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './components/pages/cadastrar-produto/cadastrar-produto.component';
import { ConsultarProdutosComponent } from './components/pages/consultar-produtos/consultar-produtos.component';
import { EditarProdutoComponent } from './components/pages/editar-produto/editar-produto.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component'; // Nova importação

export const routes: Routes = [
  {
    path: 'pages/castrar-produto',
    component: CadastrarProdutoComponent,
  },
  {
    path: 'pages/consultar-produtos',
    component: ConsultarProdutosComponent,
  },
  {
    path: 'pages/editar-produto/:id',
    component: EditarProdutoComponent,
  },
  {
    path: 'pages/dashboard',
    component: DashboardComponent, // Nova rota
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages/consultar-produtos',
  },
];
