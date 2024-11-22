import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Importa o framework Express para criar a API
// O Express é um framework minimalista e flexível para construir aplicações web Node.js

// Importa o middleware Multer para tratar uploads de arquivos
// O Multer permite gerenciar uploads de arquivos multipartes em aplicações Express

// Importa as funções controladoras para posts vindas de `postsController.js`
// Essas funções provavelmente contêm a lógica de negócio para lidar com os posts,
// como buscar, criar e processar uploads de imagens.

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads. Neste caso, 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado pelo cliente
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ storage });
// O middleware pode ser configurado com outras opções, como limites de tamanho de arquivo.

// Define uma função para configurar rotas na aplicação Express
const routes = (app) => {
  // Habilita o parseamento de requisições JSON pelo Express
  app.use(express.json());
  // Permite que o servidor interprete o corpo da requisição em formato JSON

  // Rota GET para buscar todos os posts
  // A rota '/posts' é definida como um método GET e a função `listarPosts` é usada como callback
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  // A rota '/posts' é definida como um método POST e a função `postarNovoPost` é usada como callback
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de post
  // A rota '/upload' é definida como um método POST e utiliza o middleware `upload.single('imagem')`
  // para processar o upload do arquivo 'imagem'. A função `uploadImagem` é usada como callback
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta a função `routes` para ser utilizada em outro arquivo
export default routes;