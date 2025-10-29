// backend/data/products.js

const products = [
    {
        name: 'Vapeador Sub-Ohm Titan V4',
        image: '/images/titanv4.jpg',
        description: 'Potente kit de inicio para vapeadores avanzados. Utiliza doble batería 18650.',
        brand: 'VapeKing',
        category: 'Kits Avanzados',
        price: 250000,
        countInStock: 7,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Líquido Sabor Mango Tango 60ml',
        image: '/images/mangotango.jpg',
        description: 'Delicioso e-liquid con notas dulces de mango y un toque cítrico. 3mg de nicotina.',
        brand: 'JuiceMaster',
        category: 'Líquidos',
        price: 45000,
        countInStock: 20,
        rating: 4.8,
        numReviews: 8,
    },
    {
        name: 'Pods Desechable Sabor Blueberry Ice',
        image: '/images/blueberryice.jpg',
        description: 'Vape desechable listo para usar. 5000 puffs con un refrescante sabor a arándanos.',
        brand: 'EZVape',
        category: 'Desechables',
        price: 30000,
        countInStock: 50,
        rating: 4.2,
        numReviews: 15,
    },
];

export default products;