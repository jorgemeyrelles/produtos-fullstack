package br.com._dengenharia.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import br.com._dengenharia.dtos.CategoriaProdutoResponseDto;
import br.com._dengenharia.dtos.CategoriaResponseDto;
import br.com._dengenharia.dtos.ProdutoResponseDto;
import br.com._dengenharia.entities.Categoria;
import br.com._dengenharia.entities.Produto;
import br.com._dengenharia.factories.ConnectionFactory;

public class CategoriaRepository {
	private ConnectionFactory connectionFactory = new ConnectionFactory();

	public List<CategoriaResponseDto> findAll() throws Exception {
		Connection connection = connectionFactory.getConnection();
		ProdutoRepository produtoRepository = new ProdutoRepository();

		String query = "SELECT * FROM categoria ORDER BY nome";

		PreparedStatement statement = connection.prepareStatement(query);

		ResultSet resultSet = statement.executeQuery();

		List<CategoriaResponseDto> lista = new ArrayList<CategoriaResponseDto>();

		while (resultSet.next()) {
			CategoriaResponseDto categoria = new CategoriaResponseDto();

			categoria.setId(UUID.fromString(resultSet.getString("id")));
			categoria.setNome(resultSet.getString("nome"));

			List<ProdutoResponseDto> produtos = produtoRepository
					.findByCategoriaId(
							UUID.fromString(resultSet.getString("id")));
			categoria.setProdutos(produtos);

			lista.add(categoria);
		}

		connection.close();

		return lista;
	}

	public CategoriaProdutoResponseDto findOneById(UUID id) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = "SELECT * FROM categoria WHERE id=?";

		PreparedStatement statement = connection.prepareStatement(query);

		statement.setObject(1, id);

		ResultSet resultSet = statement.executeQuery();

		CategoriaProdutoResponseDto categoria = new CategoriaProdutoResponseDto();
		while (resultSet.next()) {
			categoria.setId(id);
			categoria.setNome(resultSet.getString("nome"));
		}

		return categoria;
	}
}
