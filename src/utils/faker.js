/* eslint-disable no-restricted-syntax,prefer-destructuring */
import faker from 'faker';
import { hashSync } from 'bcrypt-nodejs';
import models from '../config/mysql';

const { Users, Posts, Products, Roles } = models;

const deleteData = async (model) => {
    const resetModel = await model.destroy({ where: {} }, { truncate: true });
    return resetModel;
};

const createRole = async (name, description) => {
    const role = await Roles.create({ name, description });
    return role;
};

export default async () => {
  try {
      await deleteData(Users);
      await deleteData(Roles);
      await deleteData(Products);
      await deleteData(Posts);
      /**
       * @Description: Fake Data Roles
       */
      const admin = await createRole('Admin', '*');
      const author = await createRole('Author', 'Editor');
      const member = await createRole('Member', 'Subscriber');

      await Array.from({ length: 5 }).forEach(async (_, key) => {
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
          if (key === 1) {
              await users.setRoles([admin]);
          } else if (key === 2) {
              await users.setRoles([author]);
          } else {
              await users.setRoles([member]);
          }

          for await (const item of [users]) {
              /**
               * @Description: Fake Data Posts
               */
              Posts.create({
                  title: faker.commerce.department(),
                  slug: faker.commerce.productMaterial(),
                  description: faker.company.companyName(),
                  user_id: item.id,
              });
              /**
               * @Description: Fake Data Products
               */
              Products.create({
                  name: faker.commerce.productName(),
                  price: faker.commerce.price(),
                  description: faker.commerce.product(),
                  images: faker.image.image(),
                  user_id: item.id,
              });
          }
    });
  } catch (err) {
    throw err;
  }
};
