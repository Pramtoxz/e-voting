import { Footer, Navbar } from '@/components/home';
import { AuthProps } from '@/types/voting';
import { ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    auth?: AuthProps;
}

export default function PublicLayout({ children, auth }: PublicLayoutProps) {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Navbar user={auth?.user} />
            
            <main className="w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
