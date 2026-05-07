import logoJayanusa from '@/assets/jayanusa.webp';
import { getPemiraYear } from '@/utils/date';

export default function AppLogo() {
    const pemiraYear = getPemiraYear();
    
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md bg-white">
                <img src={logoJayanusa} alt="Jayanusa" className="h-full w-full object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold uppercase tracking-wider text-sidebar-foreground">
                    PEMIRA
                </span>
                <div className="my-0.5 w-full border-b border-sidebar-border opacity-50"></div>
                <span className="truncate text-[10px] font-medium text-sidebar-foreground/70">
                    Pemira Jayanusa {pemiraYear}
                </span>
            </div>
        </>
    );
}
