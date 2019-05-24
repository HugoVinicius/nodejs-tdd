const expect = require('chai').expect;

const { get, getById, postProduct, deleteProduct } = require('../../routes/productsController');

let req = {
    body: {},
    params: {},
};

const res = {
    jsonCalledWith: {},
    json(arg) {
        this.jsonCalledWith = arg
    }
}

describe('Products Route', function () {
    describe('function', function () {
        it('Verifica se o retorno é um array', function () {
            get(req, res);
            expect(res.jsonCalledWith).to.not.be.an('array').is.not.empty;
        });

        it('Deve receber retorno por id', function () {
            const getReq = req;
            getReq.params = {
                id: 3
            };

            getById(getReq, res);
            expect(res.jsonCalledWith).to.be.have.keys('id', 'name', 'description', 'price');
        });

        it('Deve incluir um produto', function () {
            const getReq = req;
            getReq.body = { id: 5, name: 'Product 10', description: 'description produto', price: 13.40 };

            postProduct(getReq, res);
            expect(res.jsonCalledWith.success).to.have.string('true');;
        });

        it('Deve excluir um produto', function () {
            const getReq = req;
            getReq.params = {
                id: 3
            };

            deleteProduct(getReq, res);
            expect(res.jsonCalledWith.items.filter(p => p.id == 3).length == 0).to.be.true;            
        });
    })
});