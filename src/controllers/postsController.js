import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
// Importa as funções para obter, criar e atualizar posts do modelo de dados.

import fs from "fs";
// Importa o módulo do Node.js para interagir com o sistema de arquivos.

import gerarDescricaoComGemini from "../services/geminiService.js";
// Importa a função para gerar descrições de imagens utilizando o serviço Gemini.

// Define uma função assíncrona para listar todos os posts.
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados utilizando a função `getTodosPosts`.
  const posts = await getTodosPosts();

  // Envia os posts como resposta em formato JSON com status 200 (sucesso).
  res.status(200).json(posts);
}

// Define uma função assíncrona para criar um novo post.
export async function postarNovoPost(req, res) {
  // Extrai os dados do novo post do corpo da requisição.
  const novoPost = req.body;

  // Utiliza um bloco try-catch para tratar possíveis erros.
  try {
    // Insere o novo post no banco de dados e armazena o resultado.
    const postCriado = await criarPost(novoPost);

    // Envia o post criado como resposta com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (error) {
    // Imprime o erro no console para depuração.
    console.error(error.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Define uma função assíncrona para fazer upload de uma imagem e criar um novo post.
export async function uploadImagem(req, res) {
  // Cria um objeto para representar o novo post, incluindo a URL da imagem original.
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  // Utiliza um bloco try-catch para tratar possíveis erros.
  try {
    // Insere o novo post no banco de dados e armazena o resultado.
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome da imagem utilizando o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem e move para a pasta "uploads".
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia o post criado como resposta com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (error) {
    // Imprime o erro no console para depuração.
    console.error(error.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Define uma função assíncrona para atualizar um post existente.
export async function atualizarNovoPost(req, res) {
  // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
  const id = req.params.id;

  // Constrói a URL completa da imagem.
  const urlImagem = `http://localhost:3000/${id}.png`;

  // Utiliza um bloco try-catch para tratar possíveis erros.
  try {
    // Lê o conteúdo da imagem e o converte para um buffer.
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);

    // Gera uma descrição para a imagem utilizando o serviço Gemini.
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    // Cria um objeto com os dados atualizados do post.
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    };

    // Atualiza o post no banco de dados.
    const postCriado = await atualizarPost(id, post);

    // Envia o post atualizado como resposta com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (error) {
    // Imprime o erro no console para depuração.
    console.error(error.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}