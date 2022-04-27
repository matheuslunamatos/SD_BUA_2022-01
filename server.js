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

const clientes = [
  {
    id_cliente: 0,
    nome: "João da silva",
    data_nasci: "22/05/1964",
    celular: "(11) 99888-0987",
    email: "joao@mailinator.com",
  },
  {
    id: 1,
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
    id: (id += 1),
    nome: req.body.nome,
    data_nasci: req.body.data_nasci,
    celular: req.body.celular,
    email: req.body.email,
  };
  clientes.push(cliente);
  res.status(200).json(clientes);
});

//7° Tratar as requisições HTTP do tipo GET----------------------------------------------------
app.get("/agenda", (req, res, next) => {
  res.status(200).json(agenda);
});

app.get("/agenda/:id", (req, res, next) => {
  const idAgenda = req.params.id;

  console.log("ID AGENDA", idAgenda);

  agenda.forEach((item) => {
    const disponibilidade = item.disponibilidade;

    if (item.id_agenda == idAgenda && disponibilidade > 0) {
      item.disponibilidade = disponibilidade - 1
      console.log("Como ficou:::::::", item);
      res.status(200).json(agenda);
    }
  });
});

app.post("/reserva", (req, res, next) => {
  const reserva = {
    id_reserva: req.body.id_agenda + 1,
    nome_cliente: req.body.nome,
    id_agenda: req.body.id_agenda,
    disponibilidade: req.body.disponibilidade,
  };
});
