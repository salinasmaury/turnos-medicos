import ApplicationLogo from "@/Components/ApplicationLogo"
import { Head, Link } from "@inertiajs/react"

export default function Nosotros (){

    
   return(
    <>
    <Head title="Nosotros" />
            <div className="p-4">
                {/* Logo como botón que redirige al inicio */}
                <Link href="/" className="inline-block mb-4">
                    <ApplicationLogo className="w-16 h-auto hover:opacity-80 transition" />
                </Link>

                
                
            </div>
        
        

    <main className="flex-1">
        {/* <!-- Hero Section --> */}
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                            Conoce a nuestro equipo
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                            Somos tres estudiantes apasionados por la tecnología y comprometidos con crear soluciones que mejoren
                            el acceso a la atención médica.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Team Members Section --> */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* <!-- Mauricio Salinas --> */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Mauricio Salinas</h3>
                                <p className="text-sm text-primary-600 font-medium">Backend Developer & Team Leader</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4 flex-grow">
                            Persona muy organizada que lidera al grupo con firmeza y aporta estructura y organización al proyecto.
                        </p>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2 text-gray-900">Especialidades:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Node.js</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Bases de Datos</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">APIs</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Arquitectura</span>
                            </div>
                        </div>

                        <a href="https://github.com/salinasmaury" target="_blank" rel="noopener noreferrer" 
                           className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Ver GitHub
                        </a>
                    </div>

                    {/* <!-- Lucas Zarza --> */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Lucas Zarza</h3>
                                <p className="text-sm text-primary-600 font-medium">Frontend Developer</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4 flex-grow">
                            Comprometido con el trabajo y acompaña para todos los proyectos, asegurando la calidad en cada entrega.
                        </p>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2 text-gray-900">Especialidades:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">React</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Next.js</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">JavaScript</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Responsive Design</span>
                            </div>
                        </div>

                        <a href="https://github.com/LucasZarza1996" target="_blank" rel="noopener noreferrer" 
                           className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Ver GitHub
                        </a>
                    </div>

                    {/* <!-- Carolina Lescano --> */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Carolina Lescano</h3>
                                <p className="text-sm text-primary-600 font-medium">Frontend Developer & UI/UX Designer</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4 flex-grow">
                            Comprometida con el proyecto, busca la armonía en los colores y una vista agradable al cliente con el diseño de la interfaz gráfica.
                        </p>

                        <div className="mb-4">
                            <h4 className="font-semibold mb-2 text-gray-900">Especialidades:</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">UI/UX Design</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">CSS</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Design Systems</span>
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">User Experience</span>
                            </div>
                        </div>

                        <a href="https://github.com/carolinalescano" target="_blank" rel="noopener noreferrer" 
                           className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Ver GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Mission Section --> */}
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">Nuestra misión</h2>
                        <p className="text-gray-600 md:text-xl">
                            Como estudiantes de tecnología, creemos firmemente que la innovación puede transformar la manera en
                            que las personas acceden a los servicios de salud. MediCitas nació de nuestra pasión por crear
                            soluciones digitales que realmente impacten en la vida de las personas.
                        </p>
                        <p className="text-gray-600 md:text-xl">
                            Nuestro objetivo es simplificar el proceso de agendar citas médicas, eliminando las barreras
                            tradicionales y haciendo que el cuidado de la salud sea más accesible para todos.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Innovación</h3>
                                <p className="text-sm text-gray-600">
                                    Aplicamos las últimas tecnologías para crear experiencias excepcionales.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Colaboración</h3>
                                <p className="text-sm text-gray-600">
                                    Trabajamos en equipo combinando nuestras fortalezas individuales.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Compromiso</h3>
                                <p className="text-sm text-gray-600">
                                    Estamos dedicados a mejorar el acceso a la atención médica.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Contact Section --> */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-600 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                            ¿Quieres conocer más sobre nuestro proyecto?
                        </h2>
                        <p className="mx-auto max-w-[600px] text-primary-100 md:text-xl">
                            Estamos siempre abiertos a feedback, colaboraciones y nuevas ideas. No dudes en contactarnos o revisar
                            nuestro código en GitHub.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="/" className="px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-100">
                            Volver al inicio
                        </a>
                        <a href="mailto:contacto@medicitas.com" className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:text-primary-600">
                            Contáctanos
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    </>
   )
    


}