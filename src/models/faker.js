import faker from 'faker';
import models from './index';

export const UserFaker = async () => {
    const users = await models.User.build({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        token: faker.phone.phoneNumber(),
        verified: true,
    });
    return users.save();
}

const UserTotal = 10;
const PostTotal = 8;
const ProductTotal = 5;
const User = models.User;
const Post = models.Post;
const Product = models.Product;
/**
 * @Description: User And Post
 */
User.destroy({where: {}}, {truncate: true});
Post.destroy({where: {}}, {truncate: true});
Array.from({length: UserTotal}).forEach(async (_, index) => {
    const user = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456',
        token: faker.phone.phoneNumber(),
        verified: true,
    });
    Array.from({length: PostTotal}).forEach(async (_, index) => {
        const post  = await Post.create({
            title: faker.commerce.department(),
            slug: faker.commerce.productMaterial(),
            description: faker.company.companyName(),
            userId: user.id,
        });
    });
});
/**
 * @Description: Product
 */
Product.destroy({where: {}}, {truncate: true});
Array.from({length: ProductTotal}).forEach(async (_, index) => {
    const product  = await Product.create({
        name: faker.commerce.department(),
        price: faker.commerce.price(),
        description: faker.commerce.product(),
    });
});
export default () => {
    // try {
        /**
         * @Description: User And Post
         */
        // Array.from({length: UserTotal}).forEach((_, index) => {
        //     const user = User.create({
        //         name: faker.name.findName(),
        //         email: faker.internet.email(),
        //         password: '123456',
        //         token: faker.phone.phoneNumber(),
        //         verified: true,
        //     });
            // await Array.from({length: PostTotal}).forEach(async (_, index) => {
            //     const post  = await Post.create({
            //         title: faker.commerce.department(),
            //         slug: faker.commerce.productMaterial(),
            //         description: faker.company.companyName(),
            //         userId: user.id,
            //     });
            // });
        // });
        /**
         * @Description: Product
         */
        // await Array.from({length: Product}).forEach(async (_, index) => {
        //     const product  = await Product.create({
        //         name: faker.commerce.productName(),
        //         price: faker.commerce.price(),
        //         description: faker.commerce.product(),
        //     });
        // });
    // } catch (err) {
    //     throw err;
    // }
}
