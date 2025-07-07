import React from "react";

export default function InputConBoton({
    label,
    id,
    name,
    type = 'text',
    buttonLabel = 'Buscar',
    onButtonClick,
    className = '',
    ...props
}) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <div className="flex items-center space-x-2">
                {/* Campo de texto */}
                <input
                    id={id}
                    name={name}
                    type={type}
                    className={`flex-grow border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                    {...props}
                />
                {/* Botón de acción */}
                <button
                    type="button" // Se pone 'button' para evitar que envíe un formulario por defecto
                    onClick={onButtonClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}