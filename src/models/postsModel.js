import "dotenv/config";
// Carrega as variáveis de ambiente definidas no arquivo .env. Isso permite que você armazene informações sensíveis, como a string de conexão do banco de dados, de forma segura fora do código.

import { ObjectId } from "mongodb";
// Importa a classe ObjectId do módulo MongoDB. Essa classe é utilizada para representar IDs únicos de documentos no MongoDB.

import conectarAoBanco from "../config/dbConfig.js";
// Importa a função `conectarAoBanco` que provavelmente contém a lógica para se conectar ao banco de dados MongoDB, utilizando as informações da string de conexão.

// Conecta ao banco de dados utilizando a string de conexão armazenada na variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
  // Obtém uma referência ao banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Obtém uma referência à coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Executa uma operação de busca em toda a coleção 'posts' e retorna um array com todos os documentos encontrados.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Obtém uma referência ao banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Obtém uma referência à coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");

  // Insere um novo documento na coleção 'posts'. O documento a ser inserido é passado como parâmetro.
  return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post existente no banco de dados.
export async function atualizarPost(id, novoPost) {
  // Obtém uma referência ao banco de dados 'imersao-instabytes'.
  const db = conexao.db("imersao-instabytes");

  // Obtém uma referência à coleção 'posts'.
  const colecao = db.collection("posts");

  // Converte o ID passado como string para um objeto ObjectId do MongoDB.
  const objID = ObjectId.createFromHexString(id);

  // Atualiza um documento na coleção 'posts' cujo ID corresponde ao valor de objID.
  // O operador $set é utilizado para atualizar os campos do documento.
  return colecao.updateOne({ _id: objID }, { $set: novoPost });
}
