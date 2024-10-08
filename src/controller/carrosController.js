import * as db from '../repository/carrosRepository.js'

import multer from 'multer';

import { Router } from 'express'

const endpoints = Router();

endpoints.get ('/carros/', async (req,resp) => {

    try {
        let registro = await db.consultarcarros()
        resp.send (registro)
        
    }
     catch (err) {
        resp.status(404).send({
            erro : err.message
        })
    }
})


endpoints.post('/carros/', async (req,resp) => {

    try {
        let pessoa = req.body;

        let id = await db.inserircarros(pessoa)

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

endpoints.put ('/carros/:id', async (req,resp) => {

    try {
        let id = req.params.id
        let pessoa = req.body

        let linhasAfetadas = await db.alterarcarros (id, pessoa);
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

let uploadimagem = multer({dest: './storage/imagem'})
endpoints.put ('/carros/:id/imagem', uploadimagem.single('imagem'), async (req,resp) => {

    try {
        let id = req.params.id
        let caminhoimagem = req.file.path

       
        let linhasAfetadas = await db.alterarimagem (id, caminhoimagem);
        if (linhasAfetadas == 0)
            throw new Error('Nenhum carro encontrado')
        resp.status(200).send()
    }
     catch (err) {
        resp.status(404).send({
            erro : err.message
        })
    }
})

endpoints.delete ('/carros/:id', async (req,resp) => {

    try {
        let id = req.params.id
        let linhasAfetadas = await db.deletarcarros (id);
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
