/* eslint-disable no-restricted-syntax,prefer-destructuring */
const faker = require('faker');
const { hashSync } = require('bcrypt-nodejs');
const models = require('../config/mysql');

const { Posts, Users } = models;

const promiseSequence = (promiseA, promiseB) => {
  const arr = [promiseA, promiseB];
  return arr.reduce((promiseHandle, itemPromise) => promiseHandle.then(itemPromise), Promise.resolve());
};

const randomPhone = () => {
  const phone = Math.floor(Math.random() * 9) + 1;
  const random = faker.random.number();
  const prefix = 84;
  return parseInt(`${prefix}${phone}${random}`, 10);
};

const deleteData = async () => {
  for (const model of [Posts, Users]) {
    await model.destroy({ where: {}, truncate: { cascade: true } });
  }
};

const seedsData = async () => {
  try {
    const runCreateData = await Array.from({ length: 10 }).forEach(async (_, key) => {
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
    console.log(runCreateData, 'runCreateData');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  seedsData,
  deleteData,
  deleteData,
};

// // promise function 1
// var p1 = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("good p1");
//     }, time)
//   });
// }
//
// // promise function 2
// var p2 = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("good p2");
//     }, (time - 200));
//   });
// }
//
// // function 3  - will be wrapped in a resolved promise by .then()
// var p3 = (time) => {
//   return setTimeout(() => {
//     console.log("good p3");
//   }, (time - 400));
// }
//
// // promise function 4
// var p4 = (time) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("good p4");
//     }, (time - 600));
//   });
// }
// var promiseArr = [p1, p2, p3, p4];
// promiseArr.reduce((promiseChain, currentFunction) => promiseChain.then(currentFunction), Promise.resolve()).then(console.log);