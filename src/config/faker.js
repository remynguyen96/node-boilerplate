/* eslint-disable no-restricted-syntax,prefer-destructuring */
import faker from 'faker';
import {hashSync} from 'bcrypt-nodejs';
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
       * @Description: Fake Data Users
       */
      const users = await Users.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashSync(123456),
        avatar: 'Remy.jpg',
        intro: faker.address.country(),
        verified: true,
      });
      for await (const item of [users]) {
      /**
       * @Description: Fake Data Posts
       */
       await Posts.create({
          title: faker.commerce.department(),
          slug: faker.commerce.productMaterial(),
          description: faker.company.companyName(),
          userId: item.id,
        });
      /**
       * @Description: Fake Data Products
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
