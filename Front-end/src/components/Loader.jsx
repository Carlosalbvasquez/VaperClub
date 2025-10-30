// frontend/src/components/Loader.jsx

import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <div 
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple"
                role="status"
            >
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );
};

export default Loader;