package br.com._dengenharia.dtos;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaResponseDto {

	private UUID id;
	private String nome;
	private List<ProdutoResponseDto> produtos;
}
