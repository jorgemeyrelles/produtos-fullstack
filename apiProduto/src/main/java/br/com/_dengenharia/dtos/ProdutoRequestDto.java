package br.com._dengenharia.dtos;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoRequestDto {

	private String nome;
	private Double preco;
	private Integer quantidade;
	private UUID categoriaId;
}
