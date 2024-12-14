"use client"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Avatar
} from "@nextui-org/react";
import {SearchLine} from "@/data/public/Search-Line";
import {Logo} from "@/data/public/Logo";
import {BookMark} from "@/data/public/BookMark";
import InputComponent from "@/app/components/ui/site/input/input";
import styles from "@/app/components/ui/site/navbar/navbar.module.css"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavbarComponent() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };
    const handleCloseSearch = () => {
        setIsSearchVisible(false);
    };

    useEffect(() => {
        const userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const getLinkHref = (path: string) => {
        return isLoggedIn ? path : "/login";
    };

    const isActiveLink = (href: string) => pathname === href;

    return (
            <Navbar className={styles.navbar} position="static">
                <div className={styles.wrapper}>
                    <NavbarBrand className={styles.main}>
                        <Link href="/">
                            <Logo/>
                            <h1 className={styles.title}>CINEMANIA</h1>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent className={styles.content}>
                        <NavbarItem>
                            <Link href="/template/recommendations" className={isActiveLink("/template/recommendations") ? styles.activeLink : styles.link}>Рекомендації</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/template/films" className={isActiveLink("/template/films") ? styles.activeLink : styles.link}>Фільми</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/template/cartoons" className={isActiveLink("/template/cartoons") ? styles.activeLink : styles.link}>Мультфільми</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="/template/series" className={isActiveLink("/template/series") ? styles.activeLink : styles.link}>Серіали</Link>
                        </NavbarItem>
                    </NavbarContent>
                </div>
                <div className={styles.container}>
                    <NavbarContent className={styles.container}>
                        <NavbarItem>
                            <Link href={getLinkHref("/tariffs")}>
                                <Button variant="bordered" className={styles.button}>
                                    Тарифи
                                </Button>
                            </Link>
                        </NavbarItem>
                        <NavbarItem style={{position: 'relative', width: '100%', height: '100%'}}>
                            {isSearchVisible ? (
                                <InputComponent onClose={handleCloseSearch}/>
                            ) : (
                                <SearchLine onClick={handleSearchClick}/>
                            )}
                        </NavbarItem>
                        <NavbarItem>
                            <Link href={getLinkHref("/favorites")}>
                                <BookMark/>
                            </Link>
                        </NavbarItem>
                        <NavbarItem style={{flexShrink: "0"}}>
                            <Link href={getLinkHref("/user")}>
                                <Avatar size={"sm"}></Avatar>
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </div>
            </Navbar>
    );
}