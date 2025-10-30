// frontend/src/utils/cartUtils.js

// Función para añadir 2 decimales y convertir a número
const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // 1. Calcular el precio de los ítems (Subtotal)
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // 2. Calcular el precio de envío (Si el pedido es mayor a $200.000, es gratis)
    // Usaremos un valor fijo de $15.000 COP para pedidos menores.
    state.shippingPrice = addDecimals(state.itemsPrice > 200000 ? 0 : 15000);

    // 3. Calcular el precio de impuestos (IVA del 19%)
    // Calculamos el 19% del precio de los ítems
    state.taxPrice = addDecimals(Number((0.19 * state.itemsPrice).toFixed(2)));

    // 4. Calcular el precio total (Items + Envío + Impuestos)
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // 5. Guardar el objeto de estado completo en localStorage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;
};