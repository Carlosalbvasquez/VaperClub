// frontend/src/components/CheckoutSteps.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center mb-8">
      {[
        { label: 'Login', step: step1, to: '/login' },
        { label: 'Envío', step: step2, to: '/shipping' },
        { label: 'Pago', step: step3, to: '/payment' },
        { label: 'Realizar Pedido', step: step4, to: '/placeorder' },
      ].map((stepItem, index) => (
        <div key={index} className="flex items-center">
          {/* Enlace y estilo del paso */}
          {stepItem.step ? (
            <Link 
              to={stepItem.to} 
              className={`px-4 py-2 font-bold transition duration-300 rounded-lg text-white ${
                stepItem.step === 'current' ? 'bg-neon-purple shadow-neon-purple/70 shadow-md' : 'bg-cyan-bright/50 hover:bg-cyan-bright'
              }`}
            >
              {stepItem.label}
            </Link>
          ) : (
            <span 
              className="px-4 py-2 font-bold text-gray-500 bg-graphite/50 rounded-lg cursor-not-allowed"
            >
              {stepItem.label}
            </span>
          )}
          
          {/* Separador (flecha o línea) */}
          {index < 3 && (
            <div className="w-8 h-1 bg-neon-purple/50 mx-1"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;