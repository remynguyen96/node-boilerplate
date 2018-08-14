/* eslint-disable no-restricted-syntax,prefer-destructuring */
const faker = require('faker');
const { hashSync } = require('bcrypt-nodejs');
const models = require('../config/mysql');

const { Posts, Users } = models;

const promiseSequence = (promiseA, promiseB) => {
  const arr = [promiseA, promiseB];
  return arr.reduce((promiseHandle, itemPromise) => promiseHandle.then(itemPromise), Promise.resolve());
};

const deleteData = () => {
  Object.keys(models).forEach(async (model) => {
    await model.destroy({ where: {}, truncate: true });
  });
};

const randomPhone = () => {
  const phone = Math.floor(Math.random() * 9) + 1;
  const random = faker.random.number(); 
  const prefix = 84;
  return parseInt(`${prefix}${phone}${random}`, 10);
};

const seedsData = async () => {
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


module.exports = {
  promiseSequence,
  deleteData,
  seedsData,
};

