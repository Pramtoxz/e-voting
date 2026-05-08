import { Code2, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import DitoImage from '@/assets/dito.jpg';
import RafiImage from '@/assets/rafi.jpg';

interface Developer {
    name: string;
    role: string;
    image: string;
    bio: string;
    social: {
        github?: string;
        instagram?: string;
        linkedin?: string;
        email?: string;
    };
}

const developers: Developer[] = [
    {
        name: 'Rafi Chandra',
        role: 'Full Stack Developer',
        image: RafiImage,
        bio: 'Passionate about creating elegant solutions to complex problems',
        social: {
            github: 'https://github.com/chandra_rafi',
            instagram: 'https://instagram.com/chandra_rafi',
            email: 'rafi@jayanusa.ac.id',
        },
    },
    {
        name: 'Pramudito Metra',
        role: 'Full Stack Developer',
        image: DitoImage,
        bio: 'Building innovative web applications with modern technologies',
        social: {
            github: 'https://github.com/pramuditometra',
            instagram: 'https://instagram.com/pramuditometra',
            email: 'dito@jayanusa.ac.id',
        },
    },
];

export default function DevelopersSection() {
    return (
        <section id="developers" className="relative w-full bg-white py-12 md:py-24 lg:py-32">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
            
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-red-600 px-3 py-1 text-sm font-semibold text-red-600">
                            <Code2 className="mr-1.5 h-4 w-4" />
                            WE ARE COOKING
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-red-700 sm:text-5xl">
                            Developers
                        </h2>
                        <p className="text-muted-foreground max-w-[900px] text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Dibangun dengan dedikasi oleh Alumni STMIK-AMIK Jayanusa
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
                    {developers.map((dev, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-white to-red-50 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl sm:p-8"
                        >
                            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-red-600/5"></div>
                            
                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 animate-pulse rounded-full bg-red-600/20 blur-xl"></div>
                                    <img
                                        src={dev.image}
                                        alt={dev.name}
                                        className="relative h-32 w-32 rounded-full border-4 border-red-600 object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <h3 className="mb-2 text-2xl font-bold text-gray-800">{dev.name}</h3>
                                <p className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700">
                                    {dev.role}
                                </p>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed sm:text-base">
                                    {dev.bio}
                                </p>

                                <div className="flex gap-3">
                                    {dev.social.github && (
                                        <a
                                            href={dev.social.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg"
                                        >
                                            <Github className="h-5 w-5" />
                                        </a>
                                    )}
                                    {dev.social.instagram && (
                                        <a
                                            href={dev.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg"
                                        >
                                            <Instagram className="h-5 w-5" />
                                        </a>
                                    )}
                                    {dev.social.linkedin && (
                                        <a
                                            href={dev.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                    )}
                                    {dev.social.email && (
                                        <a
                                            href={`mailto:${dev.social.email}`}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-lg"
                                        >
                                            <Mail className="h-5 w-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground text-sm sm:text-base">
                        We Are Cooking{' '}
                        <span className="font-semibold text-red-600">Laravel</span>,{' '}
                        <span className="font-semibold text-red-600">React</span>, and{' '}
                        <span className="font-semibold text-red-600">Inertia.js</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
