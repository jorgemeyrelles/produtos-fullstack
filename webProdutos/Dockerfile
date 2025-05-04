FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

# Expor a porta padrão do Angular CLI
EXPOSE 4200

# Comando para iniciar o servidor Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]