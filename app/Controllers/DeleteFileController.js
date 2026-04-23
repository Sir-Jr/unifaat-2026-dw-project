import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../bootstrap/config.js';

export default async function DeleteFileController(request, response) {
    try {
        const { name } = request.params;

        if (!name) {
            return response.status(400).json({
                error: 'O nome do arquivo é obrigatório'
            });
        }

        const filePath = path.join(CONSTANTS.DIR, 'storage', name);

        await fs.unlink(filePath);

        return response.status(200).json({
            message: 'Arquivo deletado com sucesso',
            fileName: name
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            return response.status(404).json({
                error: 'Arquivo não encontrado'
            });
        }

        return response.status(500).json({
            error: 'Erro ao deletar o arquivo',
            details: error.message
        });
    }
}
