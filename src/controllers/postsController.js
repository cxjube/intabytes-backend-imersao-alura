import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

// Importa as funções `getTodosPosts` e `criarPost` do módulo `postsModel`,
// que provavelmente contém a lógica para interagir com o banco de dados e
// realizar operações relacionadas aos posts.
// Importa o módulo `fs` (filesystem) para realizar operações com o sistema de arquivos.

export async function listarPosts(req, res) {
  // Define uma função assíncrona para listar todos os posts.
  // Recebe como parâmetros o objeto `req` (request) e o objeto `res` (response).

  // Chama a função `getTodosPosts` para buscar todos os posts do banco de dados.
  const posts = await getTodosPosts();

  // Envia os posts como resposta em formato JSON com status 200 (sucesso).
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Define uma função assíncrona para criar um novo post.

  // Obtém os dados do novo post a partir do corpo da requisição.
  const novoPost = req.body;

  // Bloco try-catch para tratar possíveis erros durante a criação do post.
  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);

    // Envia o post criado como resposta em formato JSON com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para fins de depuração.
    console.error(erro.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  // Define uma função assíncrona para fazer upload de uma imagem e criar um novo post.

  // Cria um objeto com os dados do novo post, incluindo a URL da imagem.
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  // Bloco try-catch para tratar possíveis erros durante o upload e a criação do post.
  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome do arquivo da imagem, usando o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome, movendo-o para a pasta "uploads".
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia o post criado como resposta em formato JSON com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para fins de depuração.
    console.error(erro.message);

    // Envia uma mensagem de erro ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
