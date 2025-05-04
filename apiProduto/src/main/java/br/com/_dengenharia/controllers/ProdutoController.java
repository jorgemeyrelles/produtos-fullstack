package br.com._dengenharia.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com._dengenharia.dtos.ProdutoRequestDto;
import br.com._dengenharia.dtos.ProdutoResponseDto;
import br.com._dengenharia.entities.Categoria;
import br.com._dengenharia.entities.Produto;
import br.com._dengenharia.repositories.ProdutoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/produtos")
@Tag(name = "Produtos", description = "API para gerenciamento de produtos")
public class ProdutoController {
	private ProdutoRepository produtoRepository = new ProdutoRepository();

	@GetMapping
	@Operation(summary = "Listar todos os produtos", description = "Endpoint para listar todos os produtos cadastrados no sistema.")
	public List<ProdutoResponseDto> getAll() throws Exception {
		return produtoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	@Operation(summary = "Buscar o produto", description = "Endpoint para buscar o produto cadastrado no sistema pelo ID.")
	public ProdutoResponseDto getOneById(@PathVariable UUID id) throws Exception {
		return produtoRepository.findById(id);
	}

	@PostMapping
	@Operation(summary = "Criar um novo produto", description = "Endpoint para cadastrar um novo produto no sistema.")
	public String post(@RequestBody ProdutoRequestDto request)
			throws Exception {
		Produto produto = new Produto();
		produto.setCategoria(new Categoria());

		produto.setId(UUID.randomUUID());
		produto.setNome(request.getNome());
		produto.setPreco(request.getPreco());
		produto.setQuantidade(request.getQuantidade());
		produto.getCategoria().setId(request.getCategoriaId());

		produtoRepository.create(produto);

		return "Produto criado com sucesso";
	}

	@PutMapping("/{id}")
	@Operation(summary = "Atualizar um produto", description = "Endpoint para atualizar um produto existente no sistema.")
	public void put(@RequestBody ProdutoRequestDto produto, @PathVariable UUID id) throws Exception {

		produtoRepository.update(produto, id);
	}

	@DeleteMapping("/{id}")
	@Operation(summary = "Excluir um produto", description = "Endpoint para remover um produto do sistema.")
	public void delete(@PathVariable UUID id) throws Exception {

		produtoRepository.delete(id);
	}
}
