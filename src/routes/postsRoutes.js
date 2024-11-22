import express from "express";
// Importa o framework Express, que é a base para criar a aplicação web.

import multer from "multer";
// Importa o middleware Multer para lidar com uploads de arquivos, como imagens.

import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
// Importa as funções controladoras que contêm a lógica de negócio para cada rota da API.

import cors from "cors";
// Importa o middleware CORS para permitir requisições de diferentes origens (domínios).

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
};
// Configura as opções do CORS, permitindo requisições somente da origem especificada.

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório de destino para os arquivos carregados.
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo, mantendo o nome original.
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento.
const upload = multer({ storage });

// Define uma função para configurar as rotas da aplicação.
const routes = (app) => {
  // Habilita o parseamento de JSON no corpo das requisições.
  app.use(express.json());

  // Habilita o CORS com as opções configuradas.
  app.use(cors(corsOptions));

  // Define as rotas da aplicação:
  app.get("/posts", listarPosts); // Busca todos os posts
  app.post("/posts", postarNovoPost); // Cria um novo post
  app.post("/upload", upload.single("imagem"), uploadImagem); // Faz upload de uma imagem e cria um post
  app.put("/upload/:id", atualizarNovoPost); // Atualiza um post existente
};

export default routes;