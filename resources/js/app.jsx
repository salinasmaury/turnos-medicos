import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from 'react-hot-toast';

// 1. Importamos nuestro proveedor de contexto que creamos
import { ModalProvider } from './Context/ModalContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            // 2. Envolvemos toda la aplicación con el ModalProvider
            // Ahora, cualquier componente dentro de <App> puede acceder al contexto.
            <ModalProvider>
                <App {...props} />
                <Toaster />
            </ModalProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
