FROM nginx:latest

# Remover o arquivo de configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copiar o arquivo de configuração personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf
