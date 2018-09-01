/* eslint-disable no-restricted-syntax,prefer-destructuring */
const faker = require('faker');
const { hashSync } = require('bcrypt-nodejs');
const models = require('../config/mysql');

const { Posts, Users } = models;

const randomPhone = () => {
  const phone = Math.floor(Math.random() * 9) + 1;
  const random = faker.random.number();
  const prefix = 84;
  return parseInt(`${prefix}${phone}${random}`, 10);
};

const deleteData = async () => {
  /* eslint-disable no-await-in-loop */
  for (const model of [Posts, Users]) {
    await model.destroy({ where: {}, truncate: { cascade: true } });
  }
};

const seedsData = async () => {
  try {
    const runCreateData = await Array.from({ length: 10 }).reduce(async (promise, _, key) => {
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
      return promise.then((result) => Promise.resolve(result + key));
    }, Promise.resolve(0));
    return runCreateData;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  seedsData,
  deleteData,
};
