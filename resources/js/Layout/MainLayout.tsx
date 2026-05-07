import { Footer, Navbar } from '@/components/home';
import { AuthProps } from '@/types/voting';
import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
    auth?: AuthProps;
    showFooter?: boolean;
}

export default function MainLayout({ children, auth, showFooter = true }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar user={auth?.user} />

            {children}

            {showFooter && <Footer />}
        </div>
    );
}
