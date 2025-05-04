package br.com._dengenharia.entities;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Produto {

	private UUID id;
	private String nome;
	private Double preco;
	private Integer quantidade;
	private Categoria categoria;
}
