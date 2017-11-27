import models from '../../models';

const Product = models.Product;

export const getProducts = async (req, res) => {
    try {
        const listProducts = await Product.findAll();
        return res.status(200).json(listProducts);
    } catch (err) {
        return res.status(400).json({error: String(err)})
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        // method1: const product = await Product.findOne({
        //     where: {id: id}
        // });
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export async function addProducts(req, res) {
    try {
        console.log(req.body);
        const addProduct = await Product.create(req.body);
        return res.status(200).json(addProduct);
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function editProducts(req, res) {
    try {
        const id = req.params.id;
        const editProduct = await Product.findById(id);
        Object.keys(req.body).forEach((key) => {
            editProduct[key] = req.body[key];
        });
        return res.status(200).json(await editProduct.save());
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function removeProducts(req, res) {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.destroy({where: {id: id}});
        return res.status(200).json({'status': 'successful'});
    } catch (err) {
        return res.status(400).json(err);
    }
}


