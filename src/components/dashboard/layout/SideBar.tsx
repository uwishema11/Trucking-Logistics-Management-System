import { LeftSideMenuData } from "./LeftSectionMenuData";
import Link from "next/link";
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
    </div>
  );
};

export default Sidebar;
