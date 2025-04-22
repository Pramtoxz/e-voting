import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PageProps {
    auth: Auth;
    errors: Record<string, string>;
    deferred?: Record<string, string[] | undefined>;
    matakuliah?: {
        data: MatakuliahProps[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    users?: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface MatakuliahProps {
    kodematakuliah: string;
    namamatakuliah: string;
    sks: number;
    semester: string;
}