import { //icons
    MdDashboard,
    MdSupervisedUserCircle,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
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
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Films",
                path: "/dashboard/films",
                icon: <MdCameraRoll />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },{
                title: "Logout",
                path: "/dashboard/logout",
                icon: <MdLogout />,
            },
        ],
    },
];

export default menuItems;
