package br.com._dengenharia.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com._dengenharia.dtos.CategoriaResponseDto;
import br.com._dengenharia.repositories.CategoriaRepository;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

	@GetMapping
	public List<CategoriaResponseDto> getAll() throws Exception {
		CategoriaRepository categoriaRepository = new CategoriaRepository();
		return categoriaRepository.findAll();
	}

}
