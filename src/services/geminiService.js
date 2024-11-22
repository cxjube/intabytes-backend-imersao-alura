import { GoogleGenerativeAI } from "@google/generative-ai";
// Importa a classe `GoogleGenerativeAI` do pacote `@google/generative-ai`. Essa classe é a interface principal para interagir com os modelos de IA generativa do Google.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Cria uma instância da classe `GoogleGenerativeAI` usando a chave de API do Gemini, que é obtida da variável de ambiente `GEMINI_API_KEY`. Essa chave é necessária para autenticar as requisições à API.

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Obtém uma instância do modelo Gemini 1.5 Flash. Esse modelo é capaz de gerar texto a partir de diferentes tipos de entrada, incluindo imagens.

export default async function gerarDescricaoComGemini(imageBuffer) {
  // Define uma função assíncrona para gerar uma descrição de imagem usando o Gemini.

  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";
  // Define o prompt que será enviado ao modelo. O prompt instrui o modelo a gerar uma descrição em português brasileiro da imagem.

  try {
    // Bloco try-catch para tratar possíveis erros.

    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png"
      }
    };
    // Cria um objeto que representa a imagem, convertendo o buffer de imagem para uma string base64 e definindo o tipo MIME como "image/png".

    const res = await model.generateContent([prompt, image]);
    // Envia a solicitação para o modelo Gemini com o prompt e a imagem. A resposta é armazenada na variável `res`.

    return res.response.text() || "Alt-text não disponível.";
    // Extrai o texto da resposta do modelo e o retorna. Se não houver texto, retorna a mensagem "Alt-text não disponível.".

  } catch (error) {
    // Caso ocorra algum erro durante a geração da descrição, ele é capturado e uma mensagem de erro é exibida no console.
    console.error("Erro ao obter alt-text:", error.message, error);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}