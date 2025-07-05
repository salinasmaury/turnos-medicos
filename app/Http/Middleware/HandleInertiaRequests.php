<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // El método array_merge() es una forma más segura de añadir props
        // sin sobreescribir las que comparte el padre.
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            // ESTA ES LA PARTE QUE FALTABA
            // Aquí le decimos a Inertia que en cada petición,
            // revise la sesión en busca de datos 'flasheados'
            // con las claves 'success' y 'error' y los comparta.
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
