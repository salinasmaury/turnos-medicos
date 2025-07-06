import React from 'react';
export default function SelectConLabel({
    label,
    id,
    name,
    className = '',
    options = [],
    ...props
}) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <select
                id={id}
                name={name}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                {...props}
            >
                {/* Opcional: Añadir una primera opción deshabilitada como placeholder */}
                <option value="" disabled>
                    Seleccione una opción...
                </option>

                {/* Mapea el array de opciones para crear cada <option> */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
