package br.com._dengenharia.dtos;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaProdutoResponseDto {

	private UUID id;
	private String nome;
}
