export type NavItem = {
    label: string;
    route: string;
    icon: string;
    permissions?: string[];
    description?: string;
};

export const navigationItems: NavItem[] = [
    {
        label: 'Overview',
        route: 'dashboard',
        icon: 'LayoutDashboard',
        permissions: ['view analytics', 'manage attendance', 'manage youth', 'manage tokens', 'operate tokens'],
        description: 'Metrics and quick actions',
    },
    {
        label: 'Young People',
        route: 'admin.youth.index',
        icon: 'Users',
        permissions: ['manage youth'],
        description: 'Profiles, guardians, and medical info',
    },
    {
        label: 'Attendance',
        route: 'admin.attendance.index',
        icon: 'CalendarCheck2',
        permissions: ['manage attendance'],
        description: 'Registers and attendance stats',
    },
    {
        label: 'Tokens',
        route: 'admin.tokens.index',
        icon: 'Coins',
        permissions: ['manage tokens', 'operate tokens'],
        description: 'Rewards console for leaders',
    },
    {
        label: 'Team',
        route: 'admin.users.index',
        icon: 'Shield',
        permissions: ['manage users'],
        description: 'Manage leader accounts and access',
    },
];
