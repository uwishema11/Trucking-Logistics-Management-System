import {
  Contact,
  LayoutDashboard,
  Flame,
  Truck,
  ShoppingCart,
} from "lucide-react";

export const LeftSideMenuData = [
  {
    name: "Dashboard",
    link: "/",
    icons: <LayoutDashboard size={16} />,
    type: ["admin", "manager", "member"],
  },
  {
    name: "Users",
    link: "/users",
    icons: <Contact size={16} />,
    type: ["admin", "manager"],
  },
  {
    name: "Drivers",
    link: "/drivers",
    icons: <Flame size={16} />,
  },
  {
    name: "Orders",
    link: "/orders",
    icons: <ShoppingCart size={16} />, 
  },
  {
    name: "Trucks",
    link: "/trucks",
    icons: <Truck size={16} />, 
  },
];
