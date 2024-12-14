import { //icons
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdWork,
    MdOutlineSettings,
    MdCameraRoll,
    MdLogout,
} from "react-icons/md";

import React from "react";

export interface MenuItem { //typification
    title: string;
    path: string;
    icon: React.ReactNode;
}

export interface MenuSection { //typification
    title: string;
    list: MenuItem[];
}

const menuItems: MenuSection[] = [
    {
        title: "Сторінки",
        list: [
            {
                title: "Головна",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Користувачі",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Фільми",
                path: "/dashboard/films",
                icon: <MdCameraRoll />,
            },
            {
                title: "Транзакції",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Аналітика",
        list: [
            {
                title: "Прибуток",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            }
        ],
    },
    {
        title: "Користувач",
        list: [
            {
                title: "Налаштування",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },{
                title: "Вийти",
                path: "/dashboard/logout",
                icon: <MdLogout />,
            },
        ],
    },
];

export default menuItems;
