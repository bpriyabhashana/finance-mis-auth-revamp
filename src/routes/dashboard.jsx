import Dashboard from "../views/Dashboard/Dashboard";
import DataKeeper from "../views/DataKeeper/DataKeeper";
import Tools from "../views/Tools/Tools";
//import UserProfile from "views/UserProfile/UserProfile";
// import TableList from "views/TableList/TableList";
// import Typography from "views/Typography/Typography";
import Icons from "../views/Icons/Icons";
// import Maps from "views/Maps/Maps";
//import Notifications from "views/Notifications/Notifications";
// import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
  },
  {
    path: "/DataManager",
    name: "Module Manager",
    icon: "pe-7s-albums",
    component: DataKeeper,
  },
  {
    path: "/tools",
    name: "Tools",
    icon: "pe-7s-tools",
    component: Tools,
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "pe-7s-user",
  //   component: UserProfile
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography
  // },
  { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications
  // },
  // {
  //   help: true,
  //   path: "/help",
  //   name: "Help",
  //   icon: "pe-7s-info",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" },
];

export default dashboardRoutes;
