import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Importa o framework Express, que será utilizado para criar a aplicação web.
// O Express fornece um conjunto de ferramentas para lidar com requisições HTTP e renderizar respostas.

// Importa o módulo `routes` que contém a definição das rotas da aplicação.
// As rotas definem as diferentes URLs que a aplicação pode atender e as ações a serem executadas para cada URL.

// Cria uma instância da aplicação Express.
// Essa instância representa o servidor web que irá atender às requisições.
const app = express();

app.use(express.static("uploads"))

// Chama a função `routes` para configurar as rotas da aplicação.
// A função `routes` provavelmente define as diferentes rotas (como GET, POST, PUT, DELETE)
// e associa cada rota a uma função controladora que irá processar a requisição.
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console.
// O método `listen` inicia o servidor e o faz escutar por conexões na porta especificada.
// Quando o servidor é iniciado, a função de callback é executada, exibindo uma mensagem no console.
app.listen(3000, () => {
  console.log("Servidor escutando...");
});