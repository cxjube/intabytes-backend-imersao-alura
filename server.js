import express from "express";

const posts = [
  {
    id: 1,
    descricao:
      "Um gatinho persa com olhos azuis esverdeados, relaxando em um sofá peludo.",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 2,
    descricao:
      "Um gato siamês brincando com um barbante, fazendo caras e bocas engraçadas.",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 3,
    descricao:
      "Um gatinho malhado ronronando em um raio de sol, com uma expressão de pura felicidade.",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 4,
    descricao:
      "Um gato preto fazendo uma pose misteriosa, olhando para a câmera com um olhar penetrante.",
    imagem: "https://placekitten.com/400/300",
  },
  {
    id: 5,
    descricao:
      "Um grupo de gatinhos brincando em uma caixa de papelão, cheia de energia.",
    imagem: "https://placekitten.com/400/300",
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
});
