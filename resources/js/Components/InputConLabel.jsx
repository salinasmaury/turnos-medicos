import React from 'react';


export default function InputConLabel({
    label,
    id,
    name,
    type = 'text',
    className = '',
    ...props
}) {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={id} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                {...props}
            />
        </div>
    );
}