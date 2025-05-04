package br.com._dengenharia.factories;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionFactory {

	private static final String URL = "jdbc:postgresql://postgres_api_produtos:5432/apiProdutos"; // dados
	private static final String USER = "admin";
	private static final String PASSWORD = "root";

	public Connection getConnection() throws Exception {
		return DriverManager.getConnection(URL, USER, PASSWORD);
	}
}
