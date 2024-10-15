import React, { ReactNode } from "react"; //any types
import Sidebar from "@/app/components/ui/dashboard/sidebar/sidebar";
import styles from "@/app/components/ui/dashboard/dashboard.module.css"
import NavbarComponent from "@/app/components/ui/dashboard/navbar/navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}:LayoutProps) => { //children typification
  return(
      <div className={styles.container}>
          <div className={styles.menu}>
              <Sidebar/>
          </div>
          <div className={styles.content}>
              <NavbarComponent/>
              {children}
          </div>
      </div>
  )
}
export default Layout;