import styles from "@/app/components/ui/dashboard/sidebar/sidebar.module.css"
import menuItems, {MenuSection} from "@/data/mapping/menuItems";
import MenuLink from "@/app/components/ui/dashboard/sidebar/menuLink/menuLink";
import React from "react";
import Image from "next/image";

const Sidebar:React.FC = () => {
  return (
      <div className={styles.container}>
          <div className={styles.user}>
              <Image className={styles.userImage} height={50} width={50} src="/noavatar.png" alt={""} />
              <div className={styles.userDetail}>
                  <span className={styles.userName}>Нікнейм</span>
                  <span className={styles.userRole}>Роль</span>
              </div>
          </div>
        <ul className={styles.list}>
            {menuItems.map((section:MenuSection) => (
                <li key={section.title} className={styles.item}>
                    <span className={styles.item}>{section.title}</span>
                    {section.list.map((item) =>
                        <MenuLink item={item} key={item.title} />
                    )}
                </li>
            ))}
        </ul>
      </div>
  );
}

export default Sidebar;
