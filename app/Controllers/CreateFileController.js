import fs from 'node:fs/promises';
import path from 'node:path';
import CONSTANTS from '../../bootstrap/config.js';

export default async function CreateFileController(request, response) {
    try {
        const { name, content } = request.body;

        if (!name || !content) {
            return response.status(400).json({
                error: 'Os campos "name" e "content" são obrigatórios'
            });
        }

        const filePath = path.join(CONSTANTS.DIR, 'storage', name);

        await fs.writeFile(filePath, content, 'utf-8');

        return response.status(201).json({
            message: 'Arquivo criado com sucesso',
            fileName: name
        });
    } catch (error) {
        return response.status(500).json({
            error: 'Erro ao criar o arquivo',
            details: error.message
        });
    }
}
