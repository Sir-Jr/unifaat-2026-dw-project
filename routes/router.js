import { Router } from 'express';
import express from 'express';
import path from 'path';
import CONSTANTS from '../bootstrap/config.js';
import ListFilesController from '../app/Controllers/ListFilesController.js';
import GetFileController from '../app/Controllers/GetFileController.js';
import Return404Controller from '../app/Controllers/Return404Controller.js';
import userRouter from './apis/userRouter.js';
import addressRouter from './apis/addressRouter.js';
import EnvironmentController from '../app/Controllers/EnvironmentController.js';
import courseRouter from './apis/courseRouter.js';

const router = Router();

router.use(express.json());

router.get("/arquivo", GetFileController);

// Rota para listar arquivos na pasta 'public'
router.get('/', ListFilesController);

/** Servir o public estaticamente */
router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

/** APIS REST */

/** Users */
router.use("/users", userRouter);

/** Address - TF 09 */
router.use("/addresses", addressRouter);

/** Course - TF 11 */
router.use("/courses", courseRouter);

/** Environment - TF 10 */
router.get("/ambiente", EnvironmentController);

/** Fallback 404 para arquivos/páginas não encontrados */
router.use(Return404Controller);

export default router;
