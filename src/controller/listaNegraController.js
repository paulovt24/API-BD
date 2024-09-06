import * as db from '../repository/listaNegraRepository.js'

import { Router } from 'express'

const endpoints = Router();

endpoints.get ('/listaNegra/', async (req,resp) => {

    try {
        let registro = await db.consultarlistaNegra()
        resp.send (registro)
        
    }
     catch (err) {
        resp.status(404).send({
            erro : err.message
        })
    }
})
endpoints.post('/listaNegra/', async (req,resp) => {

    try {
        let pessoa = req.body;

        let id = await db.inserirlistaNegra(pessoa)

        resp.send({
            novoId: id
        })
        
    }
     catch (err) {
        resp.status(400).send({
            erro : err.message
        })
    }
})

endpoints.put ('/listaNegra/:id', async (req,resp) => {

    try {
        let id = req.params.id
        let pessoa = req.body

        let linhasAfetadas = await db.alterarlistaNegra (id, pessoa);
        if (linhasAfetadas >=1){
            resp.send();
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
        
    }
     catch (err) {
        resp.status(404).send({
            erro : err.message
        })
    }
})

endpoints.delete ('/listaNegra/:id', async (req,resp) => {

    try {
        let id = req.params.id
        let linhasAfetadas = await db.deletarlistaNegra (id);
        if (linhasAfetadas >=1){
            resp.send();
        }
        else {
            resp.status(404).send({erro: 'Nenhum registro encontrado'})
        }
    
        
    }
     catch (err) {
        resp.status(404).send({
            erro : err.message
        })
    }
})

export default endpoints;
