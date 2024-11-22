import { MongoClient } from "mongodb";

// Importa a classe MongoClient do módulo MongoDB.
// Essa classe é essencial para estabelecer a conexão com o banco de dados.

export default async function conectarAoBanco(stringConexao) {
  // Define uma função assíncrona para conectar ao banco de dados.
  // A palavra-chave 'async' indica que a função pode realizar operações assíncronas.
  // A função recebe como parâmetro a string de conexão para o banco de dados.

  let mongoClient;
  // Declara uma variável para armazenar a instância do cliente MongoDB.

  try {
    // Bloco try-catch para tratar possíveis erros durante a conexão.

    mongoClient = new MongoClient(stringConexao);
    // Cria uma nova instância do cliente MongoDB usando a string de conexão fornecida.

    console.log("Conectando ao cluster do banco de dados...");
    // Imprime uma mensagem no console para indicar que a conexão está sendo estabelecida.

    await mongoClient.connect();
    // Tenta estabelecer a conexão com o banco de dados.
    // A palavra-chave 'await' pausa a execução da função até que a conexão seja estabelecida.

    console.log("Conectado ao MongoDB Atlas com sucesso!");
    // Imprime uma mensagem de sucesso caso a conexão seja bem-sucedida.

    return mongoClient;
    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código.
  } catch (erro) {
    // Bloco catch para tratar erros que ocorreram durante a conexão.

    console.error("Falha na conexão com o banco!", erro);
    // Imprime uma mensagem de erro no console, junto com o objeto de erro para mais detalhes.

    process.exit();
    // Encerra a execução do processo em caso de falha na conexão.
  }
};
