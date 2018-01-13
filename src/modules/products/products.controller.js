import Sequelize from 'sequelize';
import models from '../../config/mysql';
import UploadFile from '../../config/upload';

const Products = models.Products;

export const addProducts = async (req, res) => {
    try {
        UploadFile(req, res, async (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({success: false, message: 'File size is too large. Max limit is 8MB'});
                } else if (err.code === 'filetype') {
                    return res.status(400).json({
                        success: false,
                        message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg',
                    });
                }
                return res.status(400).json({success: false, message: 'File was not able to be uploaded !'});
            }
            const dataProduct = req.body;
            dataProduct.images = null;
            if (req.file) {
                dataProduct.images = req.file.filename;
            }
            ;
            await Product.create(dataProduct);
            return res.status(200).json({success: true});
        });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const getProducts = async (req, res) => {
    try {
        const Users = models.Users;
        const listProducts = await Products.findAll({
            limit: 5,
            // offset: 1,
            // attributes: ['description', 'name', 'price', 'images', 'userId', 'createdAt'],
            order: [
                // ['price', 'DESC'],
                // [models.Users, 'createdAt', 'DESC'],
                // [Products.associations.Users, 'createdAt', 'DESC'],
            ],
            include: [{
                    model: Users,
                    // required: true,
                    // where: {id: {[Sequelize.Op.gt]: 18}},
                    where: {name: {[Sequelize.Op.like]: '%ko%'}},
            }],
        });
        // console.log(Products.testClass());
        return res.status(200).json(listProducts);
    } catch (err) {
        return res.status(400).json({error: String(err)});
    }
};

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        // method1: const product = await Product.findOne({
        //     where: {id: id}
        // });
        const product = await Products.findById(id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const editProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const editProduct = await Products.findById(id);
        Object.keys(req.body).forEach((key) => {
            editProduct[key] = req.body[key];
        });
        return res.status(200).json(await editProduct.save());
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const removeProducts = async (req, res) => {
    try {
        const id = req.params.id;
        await Products.destroy({where: {id: id}});
        return res.status(200).json({'status': 'successful'});
    } catch (err) {
        return res.status(400).json(err);
    }
};


const Allmembers = [
    {name: 'DungLT', team: null},
    {name: 'Tung', team: 'DungLT'},
    {name: 'Tan', team: 'DungLT'},
    {name: 'Khanh', team: 'Tung'},
    {name: 'Chi', team: 'Khoi'},
    {name: 'DungTC', team: 'Tan'},
    {name: 'Khoi', team: null},
    {name: 'Tuong', team: 'Tung'},
    {name: 'Duoc', team: 'Khoi'},
    {name: 'Toan', team: 'Duoc'},
    {name: 'Thien', team: 'Toan'},
];

const recursive = (name) => {
    const results = {};
    Allmembers
        .filter((item) => item.team === name)
        .forEach((item) => results[item.name] = recursive(item.name));
    return results;
};

const recursive2 = (name) => {
    return Allmembers
        .filter((item) => item.team === name)
        .reduce((results, item) => {
            results[item.name] = recursive2(item.name);
            return results;
        }, {});
};
// console.log(JSON.stringify(recursive(null), null, 2));
// console.log(JSON.stringify(recursive2(null), null, 2));

const scope = (name, value) => {
    let balance = value;
    return {
        plus(income) {
            balance = balance + income;
        },
        abstract(outcome) {
            balance = balance - outcome;
        },
        view() {
            console.info(`This is ${name} with money have is ${balance} !`);
        }
    }
};
// const testScope = scope('Remy', 10);
// testScope.plus(10);
// testScope.abstract(5);
// testScope.view();

const votes = [
    'AngularJS',
    'VueJS',
    'ReactJS',
    'ReactJS',
    'Ember',
    'AngularJS',
    'AngularJS',
    'ReactJS',
    'VueJS',
    'ReactJS',
    'ReactJS',
];
const initialValue = {};
const reducers = (tally, vote, key) => {
    if (!tally[vote]) {
        // console.log(key);
        tally[vote] = 1;
    } else {
        tally[vote] = tally[vote] + 1;
    }
    return tally;
};
console.log(votes.reduce(reducers, initialValue));




