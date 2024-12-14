"use client"
import styles from "@/app/components/ui/dashboard/sidebar/menuLink/menuLink.module.css"
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

interface MenuItem {
    path: string;
    icon: React.ReactNode;
    title: string;
}

interface MenuLinkProps {
    item: MenuItem;
}

export default function MenuLink({item}:MenuLinkProps) {
    const pathName = usePathname()
    console.log(pathName);
  return (
      <Link href={`/admin${item.path}`} className={`${styles.container} ${pathName === item.path && styles.active}`}>
          {item.icon}
          {item.title}
      </Link>
  );
}
