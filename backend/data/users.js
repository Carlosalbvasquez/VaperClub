// backend/data/users.js

const users = [
    {
        name: 'Administrador Principal',
        email: 'admin@vaperclub.com',
        password: '123456', // Se cifrará en el seeder
        isAdmin: true,
        isWholesaler: false,
    },
    {
        name: 'Cliente Normal',
        email: 'cliente@ejemplo.com',
        password: '123456',
        isAdmin: false,
        isWholesaler: false,
    },
    {
        name: 'Cliente Mayorista',
        email: 'mayorista@ejemplo.com',
        password: '123456',
        isAdmin: false,
        isWholesaler: true,
    },
];

export default users;