// frontend/src/components/Message.jsx

import React from 'react';

const Message = ({ variant = 'info', children }) => {
    let baseStyle = "p-4 rounded-lg text-sm font-medium";
    let colorStyle = "";

    switch (variant) {
        case 'success':
            colorStyle = "bg-green-900 text-green-300 border border-green-700";
            break;
        case 'danger':
            colorStyle = "bg-red-900 text-red-300 border border-red-700";
            break;
        case 'warning':
            colorStyle = "bg-yellow-900 text-yellow-300 border border-yellow-700";
            break;
        case 'info':
        default:
            colorStyle = "bg-cyan-900/50 text-cyan-bright border border-cyan-700";
            break;
    }

    return (
        <div className={`${baseStyle} ${colorStyle}`} role="alert">
            {children}
        </div>
    );
};

export default Message;