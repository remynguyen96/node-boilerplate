/* eslint-disable no-restricted-syntax,prefer-destructuring */
import faker from 'faker';
import { hashSync } from 'bcrypt-nodejs';
import models from '../config/mysql';

const { Posts, Users } = models;

export const promiseSequence = (promiseA, promiseB) => {
  const arr = [promiseA, promiseB];
  return arr.reduce((promiseHandle, itemPromise) => promiseHandle.then(itemPromise), Promise.resolve());
};

export const deleteData = () => {
  Object.keys(models).forEach(async (model) => {
    await model.destroy({ where: {}, truncate: true });
  });
};

const randomPhone = () => {
  let phone = Math.floor(Math.random() * 9) + 1;
  const prefix = 84;
  let i = 0;
  while (i < 6) {
    const rollDice = Math.floor(Math.random() * 9) + 1;
    phone += `${rollDice}`;
    i++;
  }
  return parseInt(`${prefix}${phone}`, 10);
};

export const seedsData = async () => {
  try {
    /**
     * @Description: Fake Data Roles
     */
    await Array.from({ length: 10 }).forEach(async (_, key) => {
      /**
       * @Description: Fake Data Users
       */
      const users = await Users.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: randomPhone(),
        password: hashSync(123456),
        avatar: 'avatar.png',
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
          images: `product${key + 1}.jpg`,
          user_id: item.id,
        });
      }
    });
  } catch (err) {
    throw err;
  }
};
