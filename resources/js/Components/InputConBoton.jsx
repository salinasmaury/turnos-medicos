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
                    className="px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}