import conectarAoBanco from "../config/dbConfig.js";

// Importa a função `conectarAoBanco` do módulo `dbConfig`, responsável por estabelecer a conexão com o banco de dados.
// Essa função provavelmente utiliza a biblioteca MongoDB para se conectar ao banco de dados.

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente.
// A string de conexão contém informações como o nome do servidor, porta, banco de dados e credenciais de acesso.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao-instabytes' dentro da conexão estabelecida.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados selecionado.
  // Uma coleção no MongoDB é similar a uma tabela em um banco de dados relacional.
  const colecao = db.collection("posts");

  // Executa uma operação de busca em toda a coleção 'posts' e retorna todos os documentos encontrados como um array.
  return colecao.find().toArray();
};

export async function criarPost(novoPost) {
  // Função assíncrona para criar um novo post no banco de dados.

  // Seleciona o banco de dados 'imersao-instabytes' dentro da conexão estabelecida.
  const db = conexao.db("imersao-instabytes");

  // Seleciona a coleção 'posts' dentro do banco de dados selecionado.
  const colecao = db.collection("posts");

  // Insere um novo documento na coleção 'posts'. O documento a ser inserido é passado como parâmetro.
  // A função `insertOne` retorna um objeto com informações sobre o documento inserido, incluindo o seu ID.
  return colecao.insertOne(novoPost);
};
