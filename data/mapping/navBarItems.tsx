import {
    MdChat,
    MdDarkMode,
    MdNotifications,
} from "react-icons/md";

import React from "react";

export interface NavBarItem {
    title: string;//typification
    //path: string;
    icon: React.ReactNode;
}
export interface NavBarSection {
    title: string;//typification
    list: NavBarItem[];
}


const navbarItems: NavBarSection[] = [
    {
        title: "Navbar",
        list:[
            {
                title:"Chat",
                //path: "/chat",
                icon: <MdChat />,
            },
            {
                title:"Dark mode",
                //path: "",
                icon: <MdDarkMode />,
            },
            {
                title:"Notifications",
                //path: "",
                icon: <MdNotifications />,
            },
        ]
    }
]

export default navbarItems;
