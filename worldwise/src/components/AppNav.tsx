import styles from "./AppNav.module.css";
import { NavLink } from "react-router";
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/app" end>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/countries">Countries</NavLink>
        </li>
        <li>
          <NavLink to="/app/form">Form</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
