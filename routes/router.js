import { Router } from 'express';
import express from 'express';
import path from 'path';
import CONSTANTS from '../bootstrap/config.js';
import ListFilesController from '../app/Controllers/ListFilesController.js';
import GetFileController from '../app/Controllers/GetFileController.js';
import CreateFileController from '../app/Controllers/CreateFileController.js';
import DeleteFileController from '../app/Controllers/DeleteFileController.js';

const router = Router();

router.use(express.json());

router.get("/arquivo", GetFileController);

router.post("/files", CreateFileController);

router.delete("/files/:name", DeleteFileController);

// Rota para listar arquivos na pasta 'public'
router.get('/', ListFilesController);

/** Servir o public estaticamente */
router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

/** Fallback 404 para arquivos/páginas não encontrados */
router.use((req, res) => {
    return res.status(404).sendFile(
        path.join(CONSTANTS.DIR, 'public', '404.html')
    );
});

export default router;
