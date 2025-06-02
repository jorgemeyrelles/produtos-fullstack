import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiUrlService } from '../../../services/apis/api-urls.service';
import { Chart, registerables } from 'chart.js'; // Importação do Chart.js
import 'chartjs-chart-treemap'; // Importação do plugin Treemap
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap'; // Importação dos componentes necessários

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  produtos: any[] = [];
  categorias: any[] = []; // Novo atributo para armazenar categorias

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) {
    Chart.register(...registerables);
    Chart.register(TreemapController, TreemapElement); // Registro do plugin Treemap
  }

  ngOnInit() {
    const produtosUrl = this.apiUrlService.getProdutosUrl();
    this.http.get<any[]>(produtosUrl).subscribe({
      next: (data) => {
        this.produtos = data;
        this.verificarDadosEPopularGraficos(); // Alterado para verificar os dados
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      },
    });

    const categoriasUrl = this.apiUrlService.getCategoriasUrl(); // URL para categorias
    this.http.get<any[]>(categoriasUrl).subscribe({
      next: (data) => {
        this.categorias = data; // Armazena as categorias
        this.verificarDadosEPopularGraficos(); // Alterado para verificar os dados
      },
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
      },
    });
  }

  verificarDadosEPopularGraficos() {
    if (this.produtos.length > 0 && this.categorias.length > 0) {
      this.popularGraficos();
    }
  }

  popularGraficos() {
    if (!this.categorias || this.categorias.length === 0) {
      console.error(
        'Categorias não carregadas. Não é possível popular os gráficos.'
      );
      return;
    }

    // Gráfico de Doughnut
    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: this.categorias.map((c) => c.nome),
        datasets: [
          {
            data: this.categorias.map((c) => c.produtos?.length || 0),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      },
    });

    // Gráfico de Barras (Média de Preços)
    new Chart('barChartPrecos', {
      type: 'bar',
      data: {
        labels: this.categorias.map((c) => c.nome),
        datasets: [
          {
            label: 'Média de Preços',
            data: this.categorias.map((c) =>
              c.produtos && c.produtos.length > 0
                ? c.produtos.reduce((acc: any, p: any) => acc + p.preco, 0) /
                  c.produtos.length
                : 0
            ),
            backgroundColor: '#36A2EB',
          },
        ],
      },
    });

    // Gráfico de Barras (Quantidade de Produtos)
    new Chart('barChartQuantidade', {
      type: 'bar',
      data: {
        labels: this.categorias.map((c) => c.nome),
        datasets: [
          {
            label: 'Quantidade de Produtos',
            data: this.categorias.map((c) =>
              c.produtos && c.produtos.length > 0
                ? c.produtos.reduce((acc: any, p: any) => acc + p.quantidade, 0)
                : 0
            ),
            backgroundColor: '#FF6384',
            yAxisID: 'y',
          },
          {
            label: 'Ganhos Reais',
            data: this.categorias.map((c) =>
              c.produtos && c.produtos.length > 0
                ? c.produtos.reduce(
                    (acc: any, p: any) => acc + p.quantidade * p.preco,
                    0
                  )
                : 0
            ),
            type: 'line',
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Quantidade de Produtos',
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Ganhos Reais',
            },
            grid: {
              drawOnChartArea: false, // Evita sobreposição de grades
            },
          },
        },
      },
    });

    // Gráfico de Treemap
    this.popularGraficoTreemap();

    console.log('Gráficos populados com sucesso.');
  }

  popularGraficoTreemap() {
    const treemapData = this.categorias.flatMap((categoria) =>
      categoria.produtos.map((produto: any) => ({
        categoria: categoria.nome,
        produto: produto.nome,
        quantidade: produto.quantidade,
      }))
    );

    const categoriaCores = this.categorias.reduce((acc, categoria, index) => {
      acc[categoria.nome] = [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ][index % 6]; // Define cores distintas para cada categoria
      return acc;
    }, {} as Record<string, string>);

    new Chart('treemapChart', {
      type: 'treemap',
      data: {
        datasets: [
          {
            type: 'treemap',
            data: treemapData,
            key: 'quantidade',
            groups: ['categoria', 'produto'], // Agrupamento por categoria e produto
            backgroundColor: (ctx: any) => {
              const data = ctx.raw;
              return categoriaCores[data.categoria || data._data.categoria]; // Cor baseada na categoria
            },
            borderColor: '#FFFFFF',
            borderWidth: 1,
            labels: {
              display: true, // Exibir os rótulos
              formatter: (ctx: any) => {
                return ctx.raw.g;
              }, // Nome do produto como rótulo
              color: '#000000', // Cor do texto
              font: {
                size: 8, // Tamanho da fonte
              },
            },
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const data = context.raw;
                return `${data.g}: ${data.v}`;
              },
            },
          },
          legend: {
            display: true,
            labels: {
              generateLabels: () => {
                return Object.keys(categoriaCores).map((categoria) => ({
                  text: categoria,
                  fillStyle: categoriaCores[categoria],
                }));
              },
              font: {
                size: 8, // Tamanho da fonte
                family: 'Arial', // Fonte da legenda
                weight: 'bold', // Peso da fonte
              },
            },
          },
        },
      },
    });
  }
}
