import { //icons
    MdSupervisedUserCircle,
    MdMonetizationOn,
    MdAutoGraph,
} from "react-icons/md";

import React from "react";

export interface CardIcon {
    title: string;//typification
    //path: string;
    icon: React.ReactNode;
}
export interface CardSection {
    title: string;//typification
    list: CardIcon[];
}

const cardItems: CardSection[] = [
    {
        title: "Card",
        list:[
            {
                title:"Users",
                //path: "/chat",
                icon: <MdSupervisedUserCircle size={24} />,
            },
            {
                title:"Subscriptions",
                //path: "",
                icon: <MdMonetizationOn size={24}/>,
            },
            {
                title:"Views",
                //path: "",
                icon: <MdAutoGraph size={24} />,
            },
        ]
    }
]

export default cardItems;