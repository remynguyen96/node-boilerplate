/* eslint-disable no-restricted-syntax,prefer-destructuring */
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
      await Array.from({length: 5}).forEach(async () => {
      /**
             * @Description: Users
             */
      const users = await Users.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456',
        token: faker.phone.phoneNumber(),
        description: faker.company.companyName(),
        verified: true,
      });
      for await (const item of [users]) {
      /**
       * @Description: Posts
       */
       await Posts.create({
          title: faker.commerce.department(),
          slug: faker.commerce.productMaterial(),
          description: faker.company.companyName(),
          userId: item.id,
        });
      /**
       * @Description: Products
       */
        await Products.create({
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.commerce.product(),
          images: faker.image.image(),
          userId: item.id,
        });
      }
    });
  } catch (err) {
    throw err;
  }
};
