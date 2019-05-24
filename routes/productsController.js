var ListProducts = {
    items: [{ id: 1, name: 'Product 1', description: 'Product description 1', price: 100.10 },
    { id: 2, name: 'Product 2', description: 'Product description 2', price: 200.25 },
    { id: 3, name: 'Product 3', description: 'Product description 3', price: 300.50 },
    { id: 4, name: 'Product 4', description: 'Product description 4', price: 400.75 },
    { id: 5, name: 'Product 5', description: 'Product description 5', price: 500.00 }]
};

module.exports = {
    //Um get na rota /products deverá listar um array de produtos;
    get(_, res) {
        res.json(ListProducts);
    },

    //Um get na rota /products deverá listar um array de produtos;
    //O produto retornado na rota /products/:id deve conter as propriedades exemplificadas no passo 3;
    getById(req, res) {
        if (!req.params.id) {
            res.json({ error: 'Should receive an id' })
        }

        var productLocation = null;

        for (var i = 0; i < ListProducts.items.length; i++) {
            if (ListProducts.items[i].id == req.params.id) {
                productLocation = ListProducts.items[i];
            }
        }

        if (productLocation != null) {
            res.json(productLocation)
        } else {
            res.json({ error: 'Product not found' })
        }
    },

    //Um post na rota /products deve inserir o produto na lista passado no corpo da requisição;
    postProduct(req, res) {

        if (req.body.description.length < 10) {//Um produto não deve ser inserido se a quantidade de caracteres da descrição for menor que 10;
            res.json({ success: 'false', error: 'The description field must be longer than 10 characters' });
        } else if (req.body.price <= 0) {//Um produto não deve ser inserido se a quantidade de caracteres da descrição for menor que 10;

            res.json({ success: 'false', error: 'The price field must be greater than zero' });
        } else {
            //Um post na rota /products deve inserir o produto na lista passado no corpo da requisição;
            ListProducts.items.push(req.body);
            res.json({ success: 'true', error: '' });
        }
    },

    //Um DELETE na rota /products/:id deve remover um produto da lista;
    deleteProduct(req, res) {
        if (!req.params.id) {
            res.json({ error: 'Should receive an id' })
        }

        for (var i = 0; i < ListProducts.items.length; i++) {
            if (ListProducts.items[i].id == req.params.id) {
                ListProducts.items.splice(i, 1)
                i--;
            }
        }

        res.json(ListProducts);
    }
};
