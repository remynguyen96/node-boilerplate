import faker from 'faker';
import models from './index';
const User = models.User;
const Post = models.Post;
const Product = models.Product;

User.destroy({where: {}}, {truncate: true}).then();
Post.destroy({where: {}}, {truncate: true}).then();
Product.destroy({where: {}}, {truncate: true}).then();
export default async () => {
    try {
        await Array.from({length: 5}).forEach(async (_, i) => {
            /**
             * @Description: User
             */
            const user = await User.create({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: '123456',
                token: faker.phone.phoneNumber(),
                verified: true,
            });
            for await (const item of [user]) {
                const post = await Post.create({
                    title: faker.commerce.department(),
                    slug: faker.commerce.productMaterial(),
                    description: faker.company.companyName(),
                    userId: item.id,
                });
            }
            /**
             * @Description: Product
             */
            const product = await Product.create({
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.commerce.product(),
            });
        })
    } catch (err) {
        throw err;
    }
}
