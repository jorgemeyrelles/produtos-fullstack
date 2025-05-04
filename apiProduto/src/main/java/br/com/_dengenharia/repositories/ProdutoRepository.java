package br.com._dengenharia.repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import br.com._dengenharia.dtos.CategoriaProdutoResponseDto;
import br.com._dengenharia.dtos.ProdutoRequestDto;
import br.com._dengenharia.dtos.ProdutoResponseDto;
import br.com._dengenharia.entities.Produto;
import br.com._dengenharia.factories.ConnectionFactory;

public class ProdutoRepository {
	private ConnectionFactory connectionFactory = new ConnectionFactory();
	private CategoriaRepository categoriaRepository = new CategoriaRepository();

	public void create(Produto produto) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				INSERT INTO produto(id, nome, preco, quantidade, categoria_id)
				VALUES(?,?,?,?,?)
				""";
		PreparedStatement statement = connection.prepareStatement(query);

		statement.setObject(1, produto.getId());
		statement.setString(2, produto.getNome());
		statement.setDouble(3, produto.getPreco());
		statement.setInt(4, produto.getQuantidade());
		statement.setObject(5, produto.getCategoria().getId());

		statement.execute();

		connection.close();
	}

	public void update(ProdutoRequestDto produto, UUID id) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				UPDATE produto
				SET
					nome=?,
					preco=?,
					quantidade=?,
					categoria_id=?
				WHERE id=?
				""";
		PreparedStatement statement = connection.prepareStatement(query);

		statement.setString(1, produto.getNome());
		statement.setDouble(2, produto.getPreco());
		statement.setInt(3, produto.getQuantidade());
		statement.setObject(4, produto.getCategoriaId());
		statement.setObject(5, id);

		statement.execute();

		connection.close();
	}

	public void delete(UUID id) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				DELETE FROM produto
				WHERE id=?
				""";
		PreparedStatement statement = connection.prepareStatement(query);
		statement.setObject(1, id);

		statement.execute();

		connection.close();
	}

	public List<ProdutoResponseDto> findByNome(String nome) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				SELECT p.id, p.nome, p.preco, p.quantidade, p.categoria_id FROM produto p
				WHERE p.nome like ?
				ORDER BY p.nome
				""";
		PreparedStatement statement = connection.prepareStatement(query);

		statement.setString(1, "%" + nome + "%");

		ResultSet resultSet = statement.executeQuery();

		List<ProdutoResponseDto> lista = new ArrayList<ProdutoResponseDto>();

		while (resultSet.next()) {
			ProdutoResponseDto produto = new ProdutoResponseDto();
			produto.setId(UUID.fromString(resultSet.getString("id")));
			produto.setNome(resultSet.getString("nome"));
			produto.setQuantidade(resultSet.getInt("quantidade"));
			produto.setPreco(resultSet.getDouble("preco"));

			CategoriaProdutoResponseDto catgoria = categoriaRepository
					.findOneById(UUID
							.fromString(resultSet.getString("categoria_id")));

			produto.setCategoria(catgoria);

			lista.add(produto);
		}

		connection.close();

		return lista;
	}

	public ProdutoResponseDto findById(UUID id) throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				SELECT p.id, p.nome, p.preco, p.quantidade, p.categoria_id FROM produto p
				WHERE p.id=?
				""";
		PreparedStatement statement = connection.prepareStatement(query);

		statement.setObject(1, id);

		ResultSet resultSet = statement.executeQuery();

		ProdutoResponseDto produto = null;

		while (resultSet.next()) {
			produto = new ProdutoResponseDto();
			produto.setId(UUID.fromString(resultSet.getString("id")));
			produto.setNome(resultSet.getString("nome"));
			produto.setQuantidade(resultSet.getInt("quantidade"));
			produto.setPreco(resultSet.getDouble("preco"));

			CategoriaProdutoResponseDto catgoria = categoriaRepository
					.findOneById(UUID
							.fromString(resultSet.getString("categoria_id")));

			produto.setCategoria(catgoria);

		}

		connection.close();

		return produto;
	}

	public List<ProdutoResponseDto> findAll() throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				SELECT p.id, p.nome, p.preco, p.quantidade, p.categoria_id FROM produto p
				ORDER BY p.nome
				""";
		PreparedStatement statement = connection.prepareStatement(query);

		ResultSet resultSet = statement.executeQuery();

		List<ProdutoResponseDto> lista = new ArrayList<ProdutoResponseDto>();

		while (resultSet.next()) {
			ProdutoResponseDto produto = new ProdutoResponseDto();
			produto.setId(UUID.fromString(resultSet.getString("id")));
			produto.setNome(resultSet.getString("nome"));
			produto.setQuantidade(resultSet.getInt("quantidade"));
			produto.setPreco(resultSet.getDouble("preco"));

			CategoriaProdutoResponseDto catgoria = categoriaRepository
					.findOneById(UUID
							.fromString(resultSet.getString("categoria_id")));

			produto.setCategoria(catgoria);

			lista.add(produto);
		}

		connection.close();

		return lista;
	}

	public List<ProdutoResponseDto> findByCategoriaId(UUID id)
			throws Exception {
		Connection connection = connectionFactory.getConnection();

		String query = """
				SELECT p.id, p.nome, p.preco, p.quantidade, p.categoria_id FROM produto p
				INNER JOIN categoria c ON p.categoria_id=c.id
				WHERE c.id=?
				ORDER BY p.nome
				""";

		PreparedStatement statement = connection.prepareStatement(query);

		statement.setObject(1, id);

		ResultSet resultSet = statement.executeQuery();

		List<ProdutoResponseDto> lista = new ArrayList<ProdutoResponseDto>();

		while (resultSet.next()) {
			ProdutoResponseDto produto = new ProdutoResponseDto();
			produto.setId(UUID.fromString(resultSet.getString("id")));
			produto.setNome(resultSet.getString("nome"));
			produto.setQuantidade(resultSet.getInt("quantidade"));
			produto.setPreco(resultSet.getDouble("preco"));

			CategoriaProdutoResponseDto catgoria = categoriaRepository
					.findOneById(UUID
							.fromString(resultSet.getString("categoria_id")));

			produto.setCategoria(catgoria);

			lista.add(produto);
		}

		connection.close();

		return lista;
	}
}
