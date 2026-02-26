import styles from "../styles/Header.module.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#intro" className={styles.brand}>
          JAEWON
        </a>
        <nav aria-label="메인 메뉴">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
