export default {
    name: 'Test',
    alias: 'test',
    description: 'Cria um usuário',

    options: [
        ['-n, --name <name>', 'Nome do usuário'],
        ['-e, --email <email>', 'E-mail do usuário'],
    ],

    async handle(options) {
        console.log('Criando usuário...')
        console.log(options)
    },
}