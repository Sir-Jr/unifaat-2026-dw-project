import { Router } from 'express';

import ListUserController from '../../app/Controllers/UserApi/ListUserController.js';
import GetUserController from '../../app/Controllers/UserApi/GetUserController.js';
import CreateUserController from '../../app/Controllers/UserApi/CreateUserController.js';
import UpdateUserController from '../../app/Controllers/UserApi/UpdateUserController.js';
import DeleteUserController from '../../app/Controllers/UserApi/DeleteUserController.js';

export default (() => {
    const router = Router();

    router.get('/', ListUserController);

    router.get('/:id', GetUserController);

    router.post('/', CreateUserController);

    router.put('/:id', UpdateUserController);

    router.delete('/:id', DeleteUserController);

    return router;
})();