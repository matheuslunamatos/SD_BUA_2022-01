//1° Importar os módulos necessários---------------------------------------------------------
//nomeia as const
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');

//2° Contruir o objeto express (ele vai colocar nossa aplicação para rodar)------------------
const app = express();

app.use(bodyParser.json());

//const jsonParser = bodyParser.json();

//3° Configurar a porta que o servidor atende e colocar em execução--------------------------
const porta = 3000;
app.set('port', porta);


//4°Subindo o servidor-----------------------------------------------------------------------
const server = http.createServer(app);
server.listen(3000);
console.log("O servidor esta rodando na porta " + porta);

//5° Definindo as variaveis da lista---------------------------------------------------------
let id = 2;
let alunos = [
    {
        id: 1,
        nome: "Matheus",
        fone: "123456789",
        email: "matheus@email.com"
    },
    {
        id: 2,
        nome: "Ana",
        fone: "987654321",
        email: "ana@gmail.com"
    }
];

//6° Tratar as requisições HTTP do tipo POST---------------------------------------------------
app.post("/alunos", (req, res, next) =>{
    const aluno = {
        id: id+=1,
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    };
    alunos.push(aluno);
    res.status(200).json(aluno);
})

//7° Tratar as requisições HTTP do tipo GET----------------------------------------------------
app.get("/alunos", (req, res, next)=>{
    res.status(200).json(alunos);
})

//8° Tratar as requisições HTTP do tipo PUT----------------------------------------------------
app.put("/alunos", (req, res, next) =>{
    alunos.forEach((aluno) => {
        if(aluno.id === req.body.id){
            aluno.fone = req.body.fone
        }
    })
    res.status(204).end();
});

//9° Tratar as requisições HTTP do tipo DELETE------------------------------------------------ 
app.delete("/alunos", (req, res, next) =>{
    let indice = alunos.findIndex((obj) => obj.id == req.body.id);
    if(indice >= 0){
        alunos.splice(indice, 1);
        res.status(200).json(alunos);
    }else{
        res.status(204).end();
    }
});