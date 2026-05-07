import LogoJayanusa from '@/assets/jayanusa.webp';
import { Button } from '@/components/ui/button';
import UserDialog from '@/components/home/UserDialog';
import { UserProps } from '@/types/voting';
import { getAvatarBgColor, getUserInitials } from '@/utils/avatar';
import { getPemiraYear } from '@/utils/date';
import { Link } from '@inertiajs/react';
import { LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
    user?: UserProps;
}

export default function Navbar({ user }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const pemiraYear = getPemiraYear();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = ['beranda', 'tentang', 'kandidat', 'faq', 'developers'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }

            if (window.scrollY < 100) {
                setActiveSection('beranda');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#beranda', label: 'Beranda', id: 'beranda' },
        { href: '#tentang', label: 'Tentang', id: 'tentang' },
        { href: '#kandidat', label: 'Kandidat', id: 'kandidat' },
        { href: '#faq', label: 'FAQ', id: 'faq' },
        { href: '#developers', label: 'Developers', id: 'developers' },
    ];

    const getInitials = () => getUserInitials(user);
    const getAvatarColor = () => getAvatarBgColor(user?.id);

    return (
        <>
            <UserDialog show={showUserDialog} user={user!} onClose={() => setShowUserDialog(false)} getInitials={getInitials} getAvatarBgColor={getAvatarColor} />

            <nav className="sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`transition-all duration-300 ${isScrolled ? 'my-2' : 'my-0'}`}>
                    <div
                        className={`flex h-14 items-center justify-between bg-background px-4 transition-all duration-300 sm:h-16 sm:px-6 ${
                            isScrolled
                                ? 'rounded-full shadow-lg ring-1 ring-red-500/20'
                                : 'rounded-none border-b border-red-100 backdrop-blur supports-[backdrop-filter]:bg-background/60'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white ring-2 ring-red-600">
                                <img src={LogoJayanusa} alt="Logo Jayanusa" className="h-full w-full object-contain" />
                            </div>
                            <div className="grid flex-1 text-left">
                                <span className="truncate text-sm font-bold uppercase leading-tight tracking-wider text-red-600">PEMIRA {pemiraYear}</span>
                                <div className="my-0.5 w-full border-b border-red-200 opacity-50"></div>
                                <span className="truncate text-[10px] font-medium leading-none text-muted-foreground">
                                    STMIK-AMIK JAYANUSA
                                </span>
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 md:flex">
                            {navLinks.map((link) => (
                                <a key={link.id} href={link.href}>
                                    <Button
                                        variant={activeSection === link.id ? 'default' : 'ghost'}
                                        size="sm"
                                        className={`rounded-full ${activeSection === link.id ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50 hover:text-red-600'}`}
                                    >
                                        {link.label}
                                    </Button>
                                </a>
                            ))}
                        </div>

                        <div className="hidden items-center gap-3 md:flex">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => setShowUserDialog(true)}
                                        className="flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-1.5 text-sm text-red-700 transition-all duration-300 hover:bg-red-50"
                                    >
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="h-6 w-6 rounded-full border border-red-500 object-cover" />
                                        ) : (
                                            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${getAvatarColor()}`}>
                                                {getInitials()}
                                            </div>
                                        )}
                                        <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                                    </button>
                                    <Link href={route('voting.index')}>
                                        <Button size="sm" className="rounded-full bg-red-600 hover:bg-red-700">
                                            Voting Sekarang
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link href={route('login')}>
                                    <Button size="sm" className="rounded-full bg-red-600 hover:bg-red-700">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>

                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                            {mobileMenuOpen ? <X className="h-6 w-6 text-red-600" /> : <Menu className="h-6 w-6 text-red-600" />}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
                    <div className="space-y-1 px-4 py-4">
                        {user && (
                            <div className="mb-3 flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 p-3">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full border-2 border-red-500 object-cover" />
                                ) : (
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor()}`}>
                                        {getInitials()}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                        )}
                        {navLinks.map((link) => (
                            <a key={link.id} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                <Button
                                    variant={activeSection === link.id ? 'default' : 'ghost'}
                                    size="sm"
                                    className={`w-full justify-start ${activeSection === link.id ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50 hover:text-red-600'}`}
                                >
                                    {link.label}
                                </Button>
                            </a>
                        ))}
                        {user ? (
                            <>
                                <Link href={route('voting.index')}>
                                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                                        Voting Sekarang
                                    </Button>
                                </Link>
                                <Link href={route('logout')} method="post" as="button" className="w-full">
                                    <Button variant="outline" size="sm" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href={route('login')}>
                                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
        </>
    );
}
