"use client"
import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Input,
} from "@nextui-org/react";
import navBarItems, { NavBarSection } from "@/data/mapping/navBarItems";
import { SearchIcon } from "@/data/public/SearchIcon";
import { usePathname } from "next/navigation";
import styles from "@/app/components/ui/dashboard/navbar/navbar.module.css";
import React from "react";

const NavbarComponent: React.FC = () => {
    const pathname = usePathname();
    return (
        <Navbar className={styles.container} position="static">
            <NavbarContent className={styles.menu} justify="start">
                <NavbarItem className={styles.title}>
                    {pathname.split("/").pop()}
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className={styles.menu} justify="end">
                <NavbarItem>
                    <div className={styles.search}>
                        <Input
                            classNames={{
                                input: styles.input,
                                inputWrapper: styles.inputWrapper,
                            }}
                            placeholder="Пошук"
                            size="sm"
                            startContent={
                                <SearchIcon size={18} width={15} height={15} color="black" />
                            }
                            type="search"
                        />
                    </div>
                </NavbarItem>
                <NavbarItem>
                    <div className={styles.icons}>
                        <ul className={styles.list}>
                            {navBarItems.map((section: NavBarSection) => (
                                <li key={section.title} className={styles.item}>
                                    {section.list.map((item) => (
                                        <div key={item.title} className={styles.iconWrapper}>
                                            {item.icon}
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarComponent;
