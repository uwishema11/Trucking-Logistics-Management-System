import { LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { LeftSideMenuData } from "./LeftSectionMenuData";
import styles from "./SideBar.module.scss";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen && styles.open}`}>
      <div className={styles.logo}>My App</div>

      <ul className={styles.menu}>
        {LeftSideMenuData.map((item, index) => (
          <li key={index} className={styles.menu_item}>
            <Link href={item.link} className={styles.menu_link}>
              {item.icons}
              <span className={styles.menu_text}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <div className={styles.logout}>
          <button onClick={() => signOut()}>
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
