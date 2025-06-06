// import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
// import User from "../components/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      {/* <User /> */}

      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
