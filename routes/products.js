const express = require('express');
const productsController = require('./productsController');
const router = express.Router();

router.get('/', productsController.get);//Um get na rota /products deverá listar um array de produtos
router.get('/:id', productsController.getById);//A rota /products/:id deverá retornar um produto único;
router.post('/', productsController.postProduct);//Um post na rota /products deve inserir o produto na lista passado no corpo da requisição
router.delete('/:id', productsController.deleteProduct); //Um DELETE na rota /products/:id deve remover um produto da lista;

module.exports = router;