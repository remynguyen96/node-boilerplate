import faker from 'faker';
import models from './mysql';
const Users = models.Users;
const Posts = models.Posts;
const Products = models.Products;


export default async () => {
    try {
        await Users.destroy({where: {}}, {truncate: true});
        await Posts.destroy({where: {}}, {truncate: true});
        await Products.destroy({where: {}}, {truncate: true});
        await Array.from({length: 5}).forEach(async (_, i) => {
            /**
             * @Description: Users
             */
            const users = await Users.create({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: '123456',
                token: faker.phone.phoneNumber(),
                verified: true,
            });
            for await (const item of [users]) {
                /**
                 * @Description: Posts
                 */
                const posts = await Posts.create({
                    title: faker.commerce.department(),
                    slug: faker.commerce.productMaterial(),
                    description: faker.company.companyName(),
                    userId: item.id,
                });
                /**
                 * @Description: Products
                 */
                const products = await Products.create({
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    description: faker.commerce.product(),
                    images: faker.image.image(),
                    userId: item.id,
                });
            }

        })
    } catch (err) {
        throw err;
    }
}
