package br.com._dengenharia.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().info(new Info().title("API de produtos")
				.version("1.0.0")
				.description("Documentação da API de produtos em Spring Boot")
				.contact(new Contact().name("Jorge Meyrelles").email("jotaengpuc@gmail.com")
						.url("https://github.com/jorgemeyrelles")))
				.servers(List.of(
						new Server().url("http://localhost:8080")
								.description("Servidor Local"),
						new Server().url("https://api.seu-projeto.com")
								.description("Servidor Produção")))
				.addSecurityItem(
						new SecurityRequirement().addList("bearerAuth"))
				.components(new io.swagger.v3.oas.models.Components()
						.addSecuritySchemes("bearerAuth",
								new SecurityScheme()
										.type(SecurityScheme.Type.HTTP)
										.scheme("bearer").bearerFormat("JWT")));
	}
}
