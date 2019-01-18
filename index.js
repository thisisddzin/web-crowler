const request = require("request");
const cheerio = require("cheerio");

const express = require("express");

const app = express();

app.use(express.json());

request("https://globoesporte.globo.com/futebol/brasileirao-serie-a/", function(
  err,
  res,
  body
) {
  if (err) {
    console.log("Erro: ", err);
  }

  const players = [];

  const $ = cheerio.load(body);

  $(".ranking-item-wrapper").each(function() {
    const player = $(this)
      .find(".jogador .jogador-nome")
      .text()
      .trim();
    const scores = $(this)
      .find(".jogador .jogador-gols")
      .text()
      .trim();
    const position = $(this)
      .find(".jogador .jogador-posicao")
      .text()
      .trim();

    const data = {
      player,
      scores,
      position
    };

    players.push(data);
  });

  app.get("/", (req, res) => res.json({ players }));
});

app.listen(3000, () => console.log("servidor ligado :D"));
