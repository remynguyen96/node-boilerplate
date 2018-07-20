/* eslint-disable no-restricted-syntax,prefer-destructuring */
import faker from 'faker';
import { hashSync } from 'bcrypt-nodejs';
import models from '../config/mysql';

const { Users, Posts } = models;

const deleteData = async (model) => {
  const resetModel = await model.destroy({ where: {} }, { truncate: true });
  return resetModel;
};

export default async () => {
  try {
    await deleteData(Users);
    await deleteData(Posts);
    /**
     * @Description: Fake Data Roles
     */
    await Array.from({ length: 5 }).forEach(async (_) => {
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
      /**
       * @Description: Fake Data Posts
       */
      for await (const item of [users]) {
        Posts.create({
          title: faker.name.title(),
          slug: faker.commerce.department(),
          description: faker.company.catchPhraseDescriptor(),
          images: faker.image.food(),
          user_id: item.id,
        });
      }
    });
  } catch (err) {
    throw err;
  }
};
