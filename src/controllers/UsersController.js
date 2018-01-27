import { controller, get, post } from 'route-decorators';
import BaseController from './BaseController';
import UsersModel from '../models/UsersModel';

@controller('/users')
export default class UsersController extends BaseController {
  @get('/')
  async getListUsers(ctx) {
    const listUsers = await UsersModel.find();
    ctx.body = listUsers;
  }

  @post('/')
  async post(ctx, data = {}) {
    const users = await UsersModel.create(data);
    ctx.body = users;
  }
}

