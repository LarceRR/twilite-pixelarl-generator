export const AppRoutes = {
    HOME: {
        path: '/',
        name: 'Главная',
        inPagesList: true,
    },
    BANLIST: {
        path: '/banlist',
        name: 'Банлист',
        inPagesList: true,
    },
    EDITOR: {
        path: '/editor',
        name: 'Редактор',
        inPagesList: true,
    },
    CABINET: {
        path: '/cabinet',
        name: 'Личный кабинет',
        inPagesList: false,
    }
} as const;