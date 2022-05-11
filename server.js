//1° Importar os módulos necessários---------------------------------------------------------
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { Console } = require("console");

//2° Contruir o objeto express (ele vai colocar nossa aplicação para rodar)------------------
const app = express();

app.use(bodyParser.json());

//3° Configurar a porta que o servidor atende e colocar em execução--------------------------
const porta = 3000;
app.set("port", porta);

//4°Subindo o servidor-----------------------------------------------------------------------
const server = http.createServer(app);
server.listen(3000);
console.log("O servidor esta rodando na porta " + porta);

const id = 0;

const clientes = [
  {
    id: 1,
    nome: "João da silva",
    data_nasci: "22/05/1964",
    celular: "(11) 99888-0987",
    email: "joao@mailinator.com",
  },
  {
    id: 3,
    nome: "Maria Joana",
    data_nasci: "30/07/1999",
    celular: "(11) 99488-0987",
    email: "maria@mailinator.com",
  },
];

const agenda = [
  {
    id_agenda: 0,
    data: "30-05-2022",
    hora: "08:00:00",
    disponibilidade: 10,
  },
  {
    id_agenda: 1,
    data: "30-05-2022",
    hora: "08:40:00",
    disponibilidade: 10,
  },
  {
    id_agenda: 2,
    data: "30-05-2022",
    hora: "09:00:00",
    disponibilidade: 10,
  },
  {
    id_agenda: 3,
    data: "30-05-2022",
    hora: "09:40:00",
    disponibilidade: 10,
  },
  {
    id_agenda: 4,
    data: "30-05-2022",
    hora: "10:00:00",
    disponibilidade: 10,
  },
  {
    id_agenda: 5,
    data: "30-05-2022",
    hora: "10:40:00",
    disponibilidade: 10,
  },
];

//6° Tratar as requisições HTTP do tipo POST---------------------------------------------------
app.post("/cliente", (req, res, next) => {
  const cliente = {
    id: id + 3,
    nome: req.body.nome,
    data_nasci: req.body.data_nasci,
    celular: req.body.celular,
    email: req.body.email,
  };
  clientes.push(cliente);
  res.status(200).json(clientes);
});

//exibe as datas/horarios disponiveis
app.get("/agenda", (req, res, next) => {
  res.status(200).json(agenda);
});

//cria reserva
app.post("/reserva/:id", (req, res, next) => {
  console.log("HELPPPPPP");
  const idAgenda = req.params.id;
  const cliente_id = req.body.id_cliente;

  async function getClient() {
    clientes.forEach((item) => {
      if (item.id === cliente_id) {
        console.log("ITEMEEMEME", item);
        return item;
      }
    });
  }

  getClient(cliente_id);

  console.log("DADOSSSSS", dados_cliente);
  console.log("DADOSSSSS", dados_cliente);
  console.log("DADOSSSSS", dados_cliente);
  console.log("DADOSSSSS", dados_cliente);
  console.log("DADOSSSSS", dados_cliente);
  console.log("DADOSSSSS", dados_cliente);

  agenda.forEach((item) => {
    const disponibilidade = item.disponibilidade;

    console.log("DISPONIBILIDADE", disponibilidade);

    if (item.id_agenda == idAgenda && disponibilidade > 0) {
      item.disponibilidade = disponibilidade - 1;

      const reservation = {
        id_reserva: idAgenda + 1455,
        id_cliente: cliente_id,
        nome_cliente: dados_cliente.name,
        data_nasci: dados_cliente.data_nasci,
        email: dados_cliente.email,
        celular: dados_cliente.celular,
        data_reserva: item.data,
        hora_reserva: item.hora,
        disponibilidade: item.disponibilidade,
      };

      console.log("RESERVA", reservation);

      res.status(200).json(reservation);
    }
  });
});
