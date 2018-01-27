import { Router } from 'express';
import { authJwt } from '../../utils/passport';
import * as RoleController from './roles.controller';

const routes = new Router();
routes.get('/', authJwt, RoleController.getRoles);
routes.get('/:name', authJwt, RoleController.getRole);
routes.post('/', authJwt, RoleController.createRole);
routes.patch('/:name', authJwt, RoleController.editRole);
routes.delete('/:name', authJwt, RoleController.deleteRole);

export default routes;
